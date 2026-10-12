<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\ViewHelpers;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Domain\Repository\PageRepository;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

// The page's breadcrumb as the page template gets it, for plugins that show a record on a page of their own:
// a news detail ends with the news title instead of the page title.
final class BreadcrumbViewHelper extends AbstractViewHelper
{
    private const SKIPPED_DOKTYPES = [PageRepository::DOKTYPE_SYSFOLDER, PageRepository::DOKTYPE_SPACER];

    public function initializeArguments(): void
    {
        $this->registerArgument('last', 'string', 'Title for the last entry, the page shown', false, '');
    }

    /**
     * @return list<array{title: string, link: string}>
     */
    public function render(): array
    {
        $request = $this->renderingContext->getAttribute(ServerRequestInterface::class);
        $site = $request->getAttribute('site');
        $pageInformation = $request->getAttribute('frontend.page.information');
        if (!$site instanceof Site || $pageInformation === null) {
            return [];
        }
        $items = [];
        foreach (array_reverse($pageInformation->getRootLine()) as $page) {
            if (in_array((int)$page['doktype'], self::SKIPPED_DOKTYPES, true)) {
                continue;
            }
            $uri = $site->getRouter()->generateUri((int)$page['uid'], ['_language' => $request->getAttribute('language')]);
            $items[] = ['title' => (string)($page['nav_title'] ?: $page['title']), 'link' => $uri->getPath()];
        }
        if ($items !== [] && $this->arguments['last'] !== '') {
            $items[array_key_last($items)]['title'] = $this->arguments['last'];
        }
        return $items;
    }
}
