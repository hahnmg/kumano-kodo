<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\EventListener;

use TYPO3\CMS\Backend\View\Event\ModifyDatabaseQueryForContentEvent;
use TYPO3\CMS\Core\Attribute\AsEventListener;

// Elements inside a section are edited in the section; listed again they would show as loose content.
#[AsEventListener('kumano-kodo/hide-section-children')]
final class HideSectionChildrenInPageModule
{
    public function __invoke(ModifyDatabaseQueryForContentEvent $event): void
    {
        if ($event->getTable() !== 'tt_content') {
            return;
        }
        $query = $event->getQueryBuilder();
        $query->andWhere($query->expr()->eq('tt_content.tx_kumanokodo_parent', 0));
        $event->setQueryBuilder($query);
    }
}
