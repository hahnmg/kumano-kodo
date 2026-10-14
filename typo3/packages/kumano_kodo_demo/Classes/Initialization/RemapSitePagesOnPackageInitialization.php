<?php

declare(strict_types=1);

namespace KumanoKodo\Demo\Initialization;

use TYPO3\CMS\Core\Attribute\AsEventListener;
use TYPO3\CMS\Core\Configuration\SiteConfiguration;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\CMS\Core\Package\Event\PackageInitializationEvent;
use TYPO3\CMS\Core\Site\SiteSettingsFactory;
use TYPO3\CMS\Impexp\Import;
use TYPO3\CMS\Impexp\Initialization\ImportContentOnPackageInitialization;
use TYPO3\CMS\Impexp\Initialization\ImportSiteConfigurationsOnPackageInitialization;

// The core remaps only the root page of an imported site; its error pages, the pages its route enhancers are
// limited to and its page settings would still point at the exported uids.
final readonly class RemapSitePagesOnPackageInitialization
{
    private const PAGE_SETTINGS = ['kumanoKodo.newsletter.target', 'kumanoKodo.search.page', 'kumanoKodo.privacy.page'];

    public function __construct(
        private SiteConfiguration $siteConfiguration,
        private SiteSettingsFactory $siteSettingsFactory,
        private SiteWriter $siteWriter,
    ) {}

    #[AsEventListener(after: ImportSiteConfigurationsOnPackageInitialization::class)]
    public function __invoke(PackageInitializationEvent $event): void
    {
        if ($event->getExtensionKey() !== 'kumano_kodo_demo'
            || !$event->hasStorageEntry(ImportSiteConfigurationsOnPackageInitialization::class)
            || !($import = $event->getStorageEntry(ImportContentOnPackageInitialization::class)->getResult()['import'] ?? null) instanceof Import
        ) {
            return;
        }
        $pages = $import->getImportMapId()['pages'] ?? [];
        foreach ($event->getStorageEntry(ImportSiteConfigurationsOnPackageInitialization::class)->getResult() as $identifier) {
            $configuration = $this->siteConfiguration->load($identifier);
            foreach ($configuration['errorHandling'] ?? [] as $i => $handler) {
                $configuration['errorHandling'][$i]['errorContentSource'] = preg_replace_callback(
                    '/^t3:\/\/page\?uid=(\d+)/',
                    static fn(array $m): string => 't3://page?uid=' . ($pages[(int)$m[1]] ?? $m[1]),
                    (string)($handler['errorContentSource'] ?? '')
                );
            }
            foreach ($configuration['routeEnhancers'] ?? [] as $name => $enhancer) {
                if (isset($enhancer['limitToPages'])) {
                    $configuration['routeEnhancers'][$name]['limitToPages'] = array_map(
                        static fn(int|string $uid): int => (int)($pages[(int)$uid] ?? $uid),
                        $enhancer['limitToPages']
                    );
                }
            }
            $this->siteWriter->write($identifier, $configuration);
            $settings = $this->siteSettingsFactory->loadLocalSettings($identifier) ?? [];
            foreach (array_intersect(self::PAGE_SETTINGS, array_keys($settings)) as $name) {
                $settings[$name] = (int)($pages[(int)$settings[$name]] ?? $settings[$name]);
            }
            $this->siteWriter->writeSettings($identifier, $settings);
        }
    }
}
