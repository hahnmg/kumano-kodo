<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Theme;

// themes.json is written by `npm run build:typo3` from the Figma variables.
final class ThemePresets
{
    private ?array $data = null;

    public function theme(string $name): array
    {
        $themes = $this->data()['themes'];
        return $themes[$name] ?? $themes['caramel'];
    }

    /** The folder under Resources/Public/Fonts that ships a family, null for one the theme does not ship. */
    public function fontDirectory(string $family): ?string
    {
        return $this->data()['fonts'][$family] ?? null;
    }

    private function data(): array
    {
        return $this->data ??= json_decode(
            (string)file_get_contents(__DIR__ . '/../../Resources/Private/Themes/themes.json'),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    }
}
