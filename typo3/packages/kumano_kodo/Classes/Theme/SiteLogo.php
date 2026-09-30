<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\Theme;

use TYPO3\CMS\Core\Resource\FileReference;
use TYPO3\CMS\Core\Resource\FileRepository;
use TYPO3\CMS\Core\Resource\Security\SvgSanitizer;

// The logo uploaded on the site's root page, as inline markup; '' when none is set.
final class SiteLogo
{
    private const GROUPS = ['bird' => 'logo__bird', 'text' => 'logo__text'];

    public function __construct(
        private readonly FileRepository $fileRepository,
        private readonly SvgSanitizer $svgSanitizer,
    ) {}

    public function markup(int $rootPageId): string
    {
        $reference = $this->fileRepository->findByRelation('pages', 'tx_kumanokodo_logo', $rootPageId)[0] ?? null;
        if (!$reference instanceof FileReference) {
            return '';
        }
        if (strtolower($reference->getExtension()) !== 'svg') {
            return '<img class="logo__mark logo__mark--custom" src="' . htmlspecialchars((string)$reference->getPublicUrl()) . '" alt="">';
        }
        return $this->inline($this->svgSanitizer->sanitizeContent($reference->getContents()));
    }

    // Inline, the groups bird and text become the classes logo.css colours; ids would repeat on the page.
    private function inline(string $svg): string
    {
        $document = new \DOMDocument();
        if ($svg === '' || !@$document->loadXML($svg, LIBXML_NONET)) {
            return '';
        }
        $root = $document->documentElement;
        if ($root === null || strtolower($root->localName) !== 'svg') {
            return '';
        }
        foreach ($document->getElementsByTagName('g') as $group) {
            $class = self::GROUPS[strtolower($group->getAttribute('id'))] ?? null;
            if ($class !== null) {
                $group->removeAttribute('id');
                $group->setAttribute('class', trim($group->getAttribute('class') . ' ' . $class));
            }
        }
        if (!$root->hasAttribute('viewBox') && $root->hasAttribute('width') && $root->hasAttribute('height')) {
            $root->setAttribute('viewBox', '0 0 ' . (float)$root->getAttribute('width') . ' ' . (float)$root->getAttribute('height'));
        }
        $root->setAttribute('class', 'logo__mark logo__mark--custom');
        $root->setAttribute('aria-hidden', 'true');
        $root->setAttribute('focusable', 'false');
        return (string)$document->saveXML($root);
    }
}
