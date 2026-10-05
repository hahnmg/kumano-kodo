<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\DataProcessing;

use KumanoKodo\Sitepackage\Theme\SiteLogo;
use KumanoKodo\Sitepackage\Theme\ThemePresets;
use KumanoKodo\Sitepackage\Theme\WebFontService;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Core\SystemResource\SystemResourceFactory;
use TYPO3\CMS\Core\Site\Entity\SiteLanguage;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

// Theme site settings become custom properties over the chosen theme; empty ones keep the theme's value.
final class ThemeProcessor implements DataProcessorInterface
{
    private const ROLES = ['paper', 'surface', 'sunk', 'ink', 'muted', 'line', 'hair', 'moss', 'accent'];
    private const TEXT_STYLES = ['caption', 'small', 'button', 'body', 'lead'];
    private const SPACE_STEPS = [4, 5, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 44, 56, 64, 96, 128];

    public function __construct(
        private readonly ThemePresets $presets,
        private readonly WebFontService $webFonts,
        private readonly SiteLogo $logo,
        private readonly SystemResourceFactory $resources,
    ) {}

    public function process(ContentObjectRenderer $cObj, array $contentObjectConfiguration, array $processorConfiguration, array $processedData): array
    {
        if (isset($processorConfiguration['if.']) && !$cObj->checkIf($processorConfiguration['if.'])) {
            return $processedData;
        }
        $site = $cObj->getRequest()->getAttribute('site');
        if (!$site instanceof Site) {
            return $processedData;
        }
        $settings = $site->getSettings();
        $setting = static fn (string $key): string => trim((string)$settings->get('kumanoKodo.' . $key, ''));
        $theme = $this->presets->theme($setting('theme'));

        $root = [];
        // The colour pickers default to Caramel; only a value changed from that default overrides the theme.
        $defaults = $this->presets->theme('caramel')['color'];
        foreach (['light', 'dark'] as $scheme) {
            foreach (self::ROLES as $role) {
                $color = $setting('color.' . $scheme . '.' . $role);
                if ($this->isColor($color) && strcasecmp($color, $defaults[$scheme][$role]) !== 0) {
                    $root['--palette-' . $scheme . '-' . $role] = $color;
                }
            }
        }

        $fonts = [];
        $display = $this->family($setting('font.display'));
        $meta = $this->family($setting('font.meta'));
        $body = $this->family($setting('font.body'));
        $weight = (int)$setting('font.displayWeight');
        if ($display !== '') {
            $root['--font-display'] = $this->stack($display);
        }
        if ($meta !== '') {
            $root['--font-meta'] = $this->stack($meta);
        }
        if ($body !== '') {
            foreach (self::TEXT_STYLES as $style) {
                $root['--type-' . $style . '-family'] = $this->stack($body);
            }
        }
        if ($weight >= 100 && $weight <= 900) {
            $root['--display-weight'] = (string)$weight;
        }
        $fonts[$display ?: $theme['font']['display']][] = 400;
        $fonts[$display ?: $theme['font']['display']][] = $weight ?: $theme['font']['displayWeight'];
        $fonts[$meta ?: $theme['font']['meta']][] = 400;
        $text = $body ?: $theme['font']['body'];
        $fonts[$text] = [...($fonts[$text] ?? []), 400, 500, 600];
        $fonts['Noto Sans JP'] = [400, 500, 600];

        $unit = $this->pixels($setting('spacing.unit'));
        if ($unit !== null) {
            foreach (self::SPACE_STEPS as $step) {
                $root['--space-' . $step] = round($step * $unit / 8, 2) . 'px';
            }
        }
        foreach (['container' => '--container-page', 'radius.button' => '--radius', 'radius.pill' => '--radius-pill'] as $key => $property) {
            $value = $this->pixels($setting(str_contains($key, '.') ? $key : 'spacing.' . $key));
            if ($value !== null) {
                $root[$property] = $value . 'px';
            }
        }
        // The mobile steps in the design system keep their own gutter and section spacing.
        $wide = [];
        foreach (['gutter' => '--gutter', 'sectionLarge' => '--section-lg', 'sectionSmall' => '--section-sm'] as $key => $property) {
            $value = $this->pixels($setting('spacing.' . $key));
            if ($value !== null) {
                $wide[$property] = $value . 'px';
            }
        }

        $css = $this->block(':root[data-theme]', $root);
        if ($wide !== []) {
            $css .= '@media (width > 900px) {' . $this->block(':root[data-theme]', $wide) . '}';
        }
        $processedData[$processorConfiguration['as'] ?? 'theme'] = [
            'css' => $css,
            'fonts' => $this->stylesheets($fonts, $display === '' && $weight === 0),
            'logo' => $this->logo->markup($site->getRootPageId()),
            // The core's website title, per language where one is set; the theme keeps no second copy.
            'name' => $this->websiteTitle($cObj, $site),
            'ownCss' => $this->publicFile($setting('custom.css')),
            'ownJs' => $this->publicFile($setting('custom.js')),
        ];
        return $processedData;
    }

    /** @param array<string, list<int>> $fonts family => weights */
    // A mistyped path is left out rather than ending the page with an exception.
    private function publicFile(string $path): string
    {
        if ($path === '') {
            return '';
        }
        try {
            $this->resources->createPublicResource($path);
            return $path;
        } catch (\Throwable) {
            return '';
        }
    }

    private function websiteTitle(ContentObjectRenderer $cObj, Site $site): string
    {
        $language = $cObj->getRequest()->getAttribute('language');
        $title = $language instanceof SiteLanguage ? $language->getWebsiteTitle() : '';
        return trim($title) !== '' ? $title : (string)($site->getConfiguration()['websiteTitle'] ?? '');
    }

    private function stylesheets(array $fonts, bool $themeDisplay): array
    {
        $urls = [];
        foreach ($fonts as $family => $weights) {
            $weights = array_values(array_unique($weights));
            sort($weights);
            $known = $this->presets->fontSpec($family);
            // The Storybook request carries axes like Fraunces' optical size; keep it where it covers the weights.
            $spec = $known !== null && ($themeDisplay || !str_contains($known, 'wght')) ? $known : 'wght@' . implode(';', $weights);
            $url = WebFontService::url($family, $spec);
            $urls[] = $this->webFonts->local($url) ?? $url;
        }
        return $urls;
    }

    private function stack(string $family): string
    {
        return '"' . $family . '", "Noto Sans JP", system-ui, sans-serif';
    }

    private function family(string $value): string
    {
        return preg_match('/^[A-Za-z0-9 ]{1,60}$/', $value) === 1 ? $value : '';
    }

    private function isColor(string $value): bool
    {
        return preg_match('/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i', $value) === 1
            || preg_match('/^(rgb|rgba|hsl|hsla|oklch)\([0-9.,%\s\/-]+\)$/i', $value) === 1;
    }

    private function pixels(string $value): ?float
    {
        $value = preg_replace('/px$/', '', $value);
        return is_numeric($value) && (float)$value >= 0 ? (float)$value : null;
    }

    private function block(string $selector, array $properties): string
    {
        if ($properties === []) {
            return '';
        }
        $lines = array_map(static fn (string $k, string $v): string => $k . ': ' . $v . ';', array_keys($properties), $properties);
        return $selector . ' {' . implode(' ', $lines) . '}';
    }
}
