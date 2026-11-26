<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Starter;

// Carries a label of module.xlf and its arguments, so the backend module and the command say the same.
final class StarterException extends \RuntimeException
{
    /** @param list<string> $arguments */
    public function __construct(public readonly string $label, public readonly array $arguments = [], ?\Throwable $previous = null)
    {
        parent::__construct($label, 0, $previous);
    }
}
