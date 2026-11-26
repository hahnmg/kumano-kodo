<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\ViewHelpers;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

// A site setting where the page's settings do not reach, as in a component deep inside a content element.
final class SiteSettingViewHelper extends AbstractViewHelper
{
    public function initializeArguments(): void
    {
        $this->registerArgument('name', 'string', 'The setting, for example kumanoKodo.privacy.page', true);
    }

    public function render(): mixed
    {
        $site = $this->renderingContext->getAttribute(ServerRequestInterface::class)->getAttribute('site');
        return $site instanceof Site ? $site->getSettings()->get($this->arguments['name']) : null;
    }
}
