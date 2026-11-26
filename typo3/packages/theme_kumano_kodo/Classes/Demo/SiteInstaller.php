<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Demo;

use TYPO3\CMS\Core\Configuration\SiteConfiguration;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Package\PackageManager;
use TYPO3\CMS\Core\Site\SiteSettingsFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Impexp\Utility\ImportExportUtility;

// Creates the demo or the starter as a site of its own: the pages and files from the extension's export, and the
// site configuration with every page reference pointed at the imported pages. Installing the extension adds no pages.
final readonly class SiteInstaller
{
    public const DEMO = 'demo';
    public const STARTER = 'starter';
    private const FOLDER = ['demo' => 'Demo', 'starter' => 'Starter'];
    private const REQUIRED = ['demo' => ['impexp', 'form'], 'starter' => ['impexp']];
    // Settings that hold a page uid; the core remaps only the root page.
    private const PAGE_SETTINGS = ['kumanoKodo.newsletter.target', 'kumanoKodo.search.page', 'kumanoKodo.privacy.page'];

    public function __construct(
        private PackageManager $packageManager,
        private SiteConfiguration $siteConfiguration,
        private SiteSettingsFactory $siteSettingsFactory,
        private SiteWriter $siteWriter,
        private ?WalkForm $walkForm = null,
    ) {}

    /** @return list<string> extensions the kind needs that are not installed */
    public function missingExtensions(string $kind): array
    {
        return array_values(array_filter(self::REQUIRED[$kind], fn(string $key): bool => !$this->packageManager->isPackageActive($key)));
    }

    // A free identifier, and a base path that does not collide with a site already on "/".
    public function suggest(string $kind): array
    {
        $sites = $this->siteConfiguration->resolveAllExistingSites(false);
        $identifier = 'kumano-kodo-' . $kind;
        for ($i = 2; isset($sites[$identifier]); $i++) {
            $identifier = 'kumano-kodo-' . $kind . '-' . $i;
        }
        return ['identifier' => $identifier, 'base' => $sites === [] ? '/' : '/' . $identifier . '/'];
    }

    /** @return array{identifier: string, rootPageId: int} */
    public function create(string $kind, string $identifier, string $base): array
    {
        if (!isset(self::FOLDER[$kind])) {
            throw new \InvalidArgumentException('Unknown kind "' . $kind . '", use demo or starter.', 1792051201);
        }
        if (($missing = $this->missingExtensions($kind)) !== []) {
            throw new \RuntimeException('Install these extensions first: ' . implode(', ', $missing) . '.', 1792051202);
        }
        if (isset($this->siteConfiguration->resolveAllExistingSites(false)[$identifier])) {
            throw new \RuntimeException('A site "' . $identifier . '" exists already.', 1792051203);
        }
        $source = $this->packageManager->getPackage('theme_kumano_kodo')->getPackagePath() . 'Resources/Private/' . self::FOLDER[$kind] . '/';

        $importer = GeneralUtility::makeInstance(ImportExportUtility::class);
        $importer->disableSiteConfigurationImport();
        $importer->importT3DFile($source . 'data.xml', 0);
        $map = $importer->getImport()?->getImportMapId() ?? [];
        $pages = $map['pages'] ?? [];

        $shipped = glob($source . 'Site/*', GLOB_ONLYDIR)[0] ?? '';
        $target = Environment::getConfigPath() . '/sites/' . $identifier;
        GeneralUtility::mkdir_deep($target);
        GeneralUtility::copyDirectory($shipped, $target);

        $configuration = $this->siteConfiguration->load($identifier);
        $configuration['rootPageId'] = (int)($pages[(int)$configuration['rootPageId']] ?? $configuration['rootPageId']);
        $configuration['base'] = $base;
        // Variants such as the DDEV host keep their host and take the same path.
        foreach ($configuration['baseVariants'] ?? [] as $i => $variant) {
            $configuration['baseVariants'][$i]['base'] = preg_replace('#/$#', $base, (string)$variant['base']);
        }
        $configuration = $this->remapPages($configuration, $pages);
        $this->siteWriter->write($identifier, $configuration);

        $settings = $this->siteSettingsFactory->loadLocalSettings($identifier) ?? [];
        foreach (array_intersect(self::PAGE_SETTINGS, array_keys($settings)) as $name) {
            $settings[$name] = (int)($pages[(int)$settings[$name]] ?? $settings[$name]);
        }
        $this->siteWriter->writeSettings($identifier, $settings);

        // EXT:form keeps impexp from writing form records, so the walk form is stored again for the imported element.
        if ($kind === self::DEMO && $this->walkForm !== null) {
            $exported = $this->walkForm->templateUid();
            $this->walkForm->restoreAfterImport($exported, (int)($map['tt_content'][$exported] ?? 0));
        }
        return ['identifier' => $identifier, 'rootPageId' => (int)$configuration['rootPageId']];
    }

    private function remapPages(array $configuration, array $pages): array
    {
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
        return $configuration;
    }
}
