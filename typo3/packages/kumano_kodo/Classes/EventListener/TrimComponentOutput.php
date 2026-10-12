<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\EventListener;

use TYPO3\CMS\Core\Attribute\AsEventListener;
use TYPO3\CMS\Fluid\Event\RenderComponentEvent;
use TYPO3Fluid\Fluid\Core\Component\ComponentRenderer;

// Components are written one tag per line; the line breaks around a component would render as spaces beside
// an inline one, such as an icon in a link. Trimming them keeps the templates readable and the output exact.
#[AsEventListener]
final readonly class TrimComponentOutput
{
    private const NAMESPACE = 'KumanoKodo\\Sitepackage\\Components';

    public function __invoke(RenderComponentEvent $event): void
    {
        $collection = $event->getComponentCollection();
        if (!method_exists($collection, 'getNamespace') || $collection->getNamespace() !== self::NAMESPACE) {
            return;
        }
        $event->setRenderedComponent(trim((new ComponentRenderer($collection))->renderComponent(
            $event->getViewHelperName(),
            $event->getArguments(),
            $event->getSlots(),
            $event->getParentRenderingContext(),
        )));
    }
}
