<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\ViewHelpers;

use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

// Leaves out empty attributes like attrs() in src/lib/html.ts; flags are attributes without a value.
final class ElementViewHelper extends AbstractViewHelper
{
    protected $escapeOutput = false;

    public function initializeArguments(): void
    {
        $this->registerArgument('tag', 'string', 'Element name', true);
        $this->registerArgument('attributes', 'array', 'Attributes; null, false and empty strings are left out', false, []);
        $this->registerArgument('flags', 'string', 'Comma-separated attributes rendered without a value', false, '');
    }

    public function render(): string
    {
        $tag = preg_replace('/[^a-z0-9-]/', '', strtolower((string)$this->arguments['tag']));
        $attributes = '';
        foreach ($this->arguments['attributes'] as $name => $value) {
            if ($value === null || $value === false || $value === '') {
                continue;
            }
            $attributes .= ' ' . preg_replace('/[^a-zA-Z0-9_:-]/', '', (string)$name) . '="' . htmlspecialchars((string)$value, ENT_QUOTES) . '"';
        }
        foreach (array_filter(array_map('trim', explode(',', (string)$this->arguments['flags']))) as $flag) {
            $attributes .= ' ' . preg_replace('/[^a-zA-Z0-9_:-]/', '', $flag);
        }
        return '<' . $tag . $attributes . '>' . $this->renderChildren() . '</' . $tag . '>';
    }
}
