<?php

declare(strict_types=1);

namespace KumanoKodo\Theme\DataProcessing;

use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Core\Site\Entity\SiteLanguage;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;
use TYPO3\CMS\Frontend\Page\PageInformation;

// JSON-LD for the site, the page and its trail, built only from what TYPO3 already holds (forge.typo3.org/issues/110854).
final class StructuredDataProcessor implements DataProcessorInterface
{
    public function process(ContentObjectRenderer $cObj, array $contentObjectConfiguration, array $processorConfiguration, array $processedData): array
    {
        $request = $cObj->getRequest();
        $site = $request->getAttribute('site');
        $language = $request->getAttribute('language');
        $pageInformation = $request->getAttribute('frontend.page.information');
        if (!$site instanceof Site || !$language instanceof SiteLanguage || !$pageInformation instanceof PageInformation) {
            return $processedData;
        }
        $page = $pageInformation->getPageRecord();
        // A site base without a host yields relative links; schema.org wants them absolute.
        $origin = rtrim($request->getAttribute('normalizedParams')->getSiteUrl(), '/');
        $absolute = static fn(string $link): string => str_starts_with($link, '/') ? $origin . $link : $link;
        $url = static fn(int $uid): string => $absolute($cObj->createUrl(['parameter' => $uid]));
        $home = $absolute((string)$language->getBase());
        $title = trim($language->getWebsiteTitle()) !== '' ? $language->getWebsiteTitle() : (string)($site->getConfiguration()['websiteTitle'] ?? '');

        $webPage = array_filter([
            '@type' => 'WebPage',
            '@id' => $url((int)$page['uid']) . '#webpage',
            'url' => $url((int)$page['uid']),
            'name' => $page['seo_title'] ?: $page['title'],
            'description' => $page['description'] ?? '',
            'inLanguage' => $language->getHreflang(),
            'isPartOf' => ['@id' => $home . '#website'],
            'dateModified' => ($page['SYS_LASTCHANGED'] ?? 0) > 0 ? date('c', (int)$page['SYS_LASTCHANGED']) : '',
        ]);
        $graph = [
            array_filter(['@type' => 'WebSite', '@id' => $home . '#website', 'url' => $home, 'name' => $title, 'inLanguage' => $language->getHreflang()]),
            $webPage,
        ];
        $trail = array_reverse($pageInformation->getRootLine());
        if (count($trail) > 1) {
            $items = [];
            foreach ($trail as $position => $step) {
                $items[] = ['@type' => 'ListItem', 'position' => $position + 1, 'name' => $step['nav_title'] ?: $step['title'], 'item' => $url((int)$step['uid'])];
            }
            $graph[] = ['@type' => 'BreadcrumbList', 'itemListElement' => $items];
        }
        // HEX_TAG keeps a title containing "</script>" from ending the script element.
        $processedData[$processorConfiguration['as'] ?? 'structuredData'] = json_encode(
            ['@context' => 'https://schema.org', '@graph' => $graph],
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_THROW_ON_ERROR
        );
        return $processedData;
    }
}
