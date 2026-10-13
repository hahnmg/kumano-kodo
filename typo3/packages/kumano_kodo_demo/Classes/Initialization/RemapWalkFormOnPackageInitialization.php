<?php

declare(strict_types=1);

namespace KumanoKodo\Demo\Initialization;

use KumanoKodo\Demo\Form\WalkForm;
use TYPO3\CMS\Core\Attribute\AsEventListener;
use TYPO3\CMS\Core\Package\Event\PackageInitializationEvent;
use TYPO3\CMS\Impexp\Import;
use TYPO3\CMS\Impexp\Initialization\ImportContentOnPackageInitialization;

// EXT:form keeps impexp from writing form records, so the walk form is stored again after the import, with the
// imported content element's uid.
final readonly class RemapWalkFormOnPackageInitialization
{
    public function __construct(private WalkForm $walkForm) {}

    #[AsEventListener(after: ImportContentOnPackageInitialization::class)]
    public function __invoke(PackageInitializationEvent $event): void
    {
        if ($event->getExtensionKey() !== 'kumano_kodo_demo'
            || !$event->hasStorageEntry(ImportContentOnPackageInitialization::class)
            || !($import = $event->getStorageEntry(ImportContentOnPackageInitialization::class)->getResult()['import'] ?? null) instanceof Import
        ) {
            return;
        }
        $exported = $this->walkForm->templateUid();
        $this->walkForm->restoreAfterImport($exported, (int)($import->getImportMapId()['tt_content'][$exported] ?? 0));
    }
}
