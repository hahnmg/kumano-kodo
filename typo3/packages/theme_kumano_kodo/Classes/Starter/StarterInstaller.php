<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Starter;

use Psr\Log\LoggerInterface;
use TYPO3\CMS\Core\Configuration\SiteConfiguration;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Core\Package\PackageManager;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Impexp\Utility\ImportExportUtility;

// The starter as a site of its own, from the extension's export. Installing the extension adds no pages;
// the demo is the package typo3/theme-kumano-kodo-demo.
final readonly class StarterInstaller
{
    private const REQUIRED = ['impexp'];
    // The rule of the core's site module: the identifier is a directory name.
    private const IDENTIFIER = '/^[a-z0-9_-]{1,255}$/';

    public function __construct(
        private PackageManager $packageManager,
        private SiteConfiguration $siteConfiguration,
        private SiteWriter $siteWriter,
        private LoggerInterface $logger,
    ) {}

    /** @return list<string> extensions the starter needs that are not installed */
    public function missingExtensions(): array
    {
        return array_values(array_filter(self::REQUIRED, fn(string $key): bool => !$this->packageManager->isPackageActive($key)));
    }

    /** @return array{identifier: string, base: string} a free identifier, and a base that does not take "/" from a site */
    public function suggest(): array
    {
        $sites = $this->siteConfiguration->resolveAllExistingSites(false);
        $identifier = 'kumano-kodo-starter';
        for ($i = 2; isset($sites[$identifier]); $i++) {
            $identifier = 'kumano-kodo-starter-' . $i;
        }
        return ['identifier' => $identifier, 'base' => $sites === [] ? '/' : '/' . $identifier . '/'];
    }

    /**
     * Everything that can fail is checked before the import; should the rest fail anyway, the imported pages go again.
     *
     * @return array{identifier: string, rootPageId: int}
     * @throws StarterException
     */
    public function create(string $identifier, string $base): array
    {
        $source = $this->packageManager->getPackage('theme_kumano_kodo')->getPackagePath() . 'Resources/Private/Starter/';
        $shipped = glob($source . 'Site/*', GLOB_ONLYDIR)[0] ?? '';
        $this->check($identifier, $base, $source, $shipped);
        $importer = GeneralUtility::makeInstance(ImportExportUtility::class);
        $importer->disableSiteConfigurationImport();
        $target = Environment::getConfigPath() . '/sites/' . $identifier;
        try {
            $importer->importT3DFile($source . 'data.xml', 0);
            $pages = $importer->getImport()?->getImportMapId()['pages'] ?? [];
            GeneralUtility::mkdir_deep($target);
            GeneralUtility::copyDirectory($shipped, $target);
            $configuration = $this->siteConfiguration->load($identifier);
            $configuration['rootPageId'] = (int)($pages[(int)$configuration['rootPageId']] ?? 0);
            if ($configuration['rootPageId'] === 0) {
                throw new \RuntimeException('The export holds no root page.', 1792051204);
            }
            $configuration['base'] = $base;
            // Variants such as the DDEV host keep their host and take the same path.
            foreach ($configuration['baseVariants'] ?? [] as $i => $variant) {
                $configuration['baseVariants'][$i]['base'] = preg_replace('#/$#', $base, (string)$variant['base']);
            }
            $this->siteWriter->write($identifier, $configuration);
        } catch (\Throwable $e) {
            $this->logger->error('The starter could not be created: {message}', ['message' => $e->getMessage(), 'exception' => $e]);
            $this->removePages($importer->getImport()?->getImportMapId()['pages'] ?? []);
            GeneralUtility::rmdir($target, true);
            throw new StarterException('error.import', [], $e);
        }
        return ['identifier' => $identifier, 'rootPageId' => $configuration['rootPageId']];
    }

    /** @throws StarterException */
    private function check(string $identifier, string $base, string $source, string $shipped): void
    {
        if (!is_file($source . 'data.xml') || !is_file($shipped . '/config.yaml')) {
            $this->logger->error('The starter export in {source} lacks data.xml or Site/*/config.yaml.', ['source' => $source]);
            throw new StarterException('error.import');
        }
        if (($missing = $this->missingExtensions()) !== []) {
            throw new StarterException('error.missing', [implode(', ', $missing)]);
        }
        if (preg_match(self::IDENTIFIER, $identifier) !== 1) {
            throw new StarterException('error.identifier', [$identifier]);
        }
        $sites = $this->siteConfiguration->resolveAllExistingSites(false);
        if (isset($sites[$identifier]) || is_dir(Environment::getConfigPath() . '/sites/' . $identifier)) {
            throw new StarterException('error.identifierTaken', [$identifier]);
        }
        if (preg_match('#^(/|https?://[^/\s]+/)\S*$#', $base) !== 1) {
            throw new StarterException('error.base', [$base]);
        }
        foreach ($sites as $site) {
            if (rtrim((string)$site->getConfiguration()['base'], '/') === rtrim($base, '/')) {
                throw new StarterException('error.baseTaken', [$site->getIdentifier(), $base]);
            }
        }
    }

    /** @param array<int, int> $pages exported uid => imported uid */
    private function removePages(array $pages): void
    {
        if ($pages === []) {
            return;
        }
        $dataHandler = GeneralUtility::makeInstance(DataHandler::class);
        $dataHandler->start([], ['pages' => array_fill_keys(array_values($pages), ['delete' => 1])]);
        $dataHandler->process_cmdmap();
    }
}
