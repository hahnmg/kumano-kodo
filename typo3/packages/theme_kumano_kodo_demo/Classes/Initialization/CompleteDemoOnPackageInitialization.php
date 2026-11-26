<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodoDemo\Initialization;

use TYPO3\CMS\Core\Attribute\AsEventListener;
use TYPO3\CMS\Core\Configuration\SiteConfiguration;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\CMS\Core\Package\Event\PackageInitializationEvent;
use TYPO3\CMS\Core\Site\SiteSettingsFactory;
use TYPO3\CMS\Impexp\Import;
use TYPO3\CMS\Impexp\Initialization\ImportContentOnPackageInitialization;
use TYPO3\CMS\Impexp\Initialization\ImportSiteConfigurationsOnPackageInitialization;
use TYPO3\CMS\ThemeKumanoKodoDemo\WalkForm;

// The core remaps only the root page of an imported site; its error pages and page settings would still point at
// the exported uids. EXT:form keeps impexp from writing form records, so the walk form is stored again.
final readonly class CompleteDemoOnPackageInitialization
{
    private const PAGE_SETTINGS = ['kumanoKodo.newsletter.target', 'kumanoKodo.search.page', 'kumanoKodo.privacy.page'];

    public function __construct(
        private SiteConfiguration $siteConfiguration,
        private SiteSettingsFactory $siteSettingsFactory,
        private SiteWriter $siteWriter,
        private WalkForm $walkForm,
    ) {}

    #[AsEventListener(after: ImportSiteConfigurationsOnPackageInitialization::class)]
    public function __invoke(PackageInitializationEvent $event): void
    {
        if ($event->getExtensionKey() !== 'theme_kumano_kodo_demo'
            || !$event->hasStorageEntry(ImportContentOnPackageInitialization::class)
            || !($import = $event->getStorageEntry(ImportContentOnPackageInitialization::class)->getResult()['import'] ?? null) instanceof Import
        ) {
            return;
        }
        $map = $import->getImportMapId();
        $pages = $map['pages'] ?? [];
        $sites = $event->hasStorageEntry(ImportSiteConfigurationsOnPackageInitialization::class)
            ? $event->getStorageEntry(ImportSiteConfigurationsOnPackageInitialization::class)->getResult()
            : [];
        foreach ($sites as $identifier) {
            $configuration = $this->siteConfiguration->load($identifier);
            foreach ($configuration['errorHandling'] ?? [] as $i => $handler) {
                $configuration['errorHandling'][$i]['errorContentSource'] = preg_replace_callback(
                    '/^t3:\/\/page\?uid=(\d+)/',
                    static fn(array $m): string => 't3://page?uid=' . ($pages[(int)$m[1]] ?? $m[1]),
                    (string)($handler['errorContentSource'] ?? '')
                );
            }
            $this->siteWriter->write($identifier, $configuration);
            $settings = $this->siteSettingsFactory->loadLocalSettings($identifier) ?? [];
            foreach (array_intersect(self::PAGE_SETTINGS, array_keys($settings)) as $name) {
                $settings[$name] = (int)($pages[(int)$settings[$name]] ?? $settings[$name]);
            }
            $this->siteWriter->writeSettings($identifier, $settings);
        }
        $exported = $this->walkForm->templateUid();
        $content = array_map(intval(...), array_values($map['tt_content'] ?? []));
        $this->walkForm->restoreAfterImport($exported, (int)($map['tt_content'][$exported] ?? 0), $content);
    }
}
