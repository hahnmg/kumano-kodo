<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\EventListener;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Attribute\AsEventListener;
use TYPO3\CMS\Core\Domain\RecordInterface;
use TYPO3\CMS\Core\Page\ContentArea;
use TYPO3\CMS\Core\Page\ContentAreaClosure;
use TYPO3\CMS\Core\Page\ResolveContentAreasEvent;
use TYPO3\CMS\Frontend\Content\ContentAreaResolver;

// Elements inside a section keep the section's column; the section renders them, the page must not.
#[AsEventListener('kumano-kodo/remove-section-children', after: ContentAreaResolver::class)]
final class RemoveSectionChildrenFromContentAreas
{
    public function __invoke(ResolveContentAreasEvent $event): void
    {
        $areas = [];
        foreach ($event->getContentAreas() as $identifier => $area) {
            $areas[$identifier] = new ContentAreaClosure(static function (ServerRequestInterface $request) use ($area): ContentArea {
                $area = $area instanceof ContentAreaClosure ? $area->instantiate($request) : $area;
                return $area->withRecords(array_values(array_filter(
                    $area->getRecords(),
                    // The field is in no type's form, so only the raw row carries it.
                    static fn (RecordInterface $record): bool => (int)($record->getRawRecord()?->get('tx_kumanokodo_parent') ?? 0) === 0,
                )));
            });
        }
        $event->setContentAreas($areas);
    }
}
