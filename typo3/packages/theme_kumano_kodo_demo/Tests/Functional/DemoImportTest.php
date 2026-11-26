<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodoDemo\Tests\Functional;

use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Configuration\SiteConfiguration;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Localization\LanguageServiceFactory;
use TYPO3\CMS\Core\Package\PackageManager;
use TYPO3\CMS\Core\Package\PackageSetup;
use TYPO3\CMS\Core\Site\SiteFinder;
use TYPO3\CMS\Core\Site\SiteSettingsFactory;
use TYPO3\TestingFramework\Core\Functional\Framework\Frontend\InternalRequest;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

// The demo as extension:setup installs it: the core imports Initialisation/, the package completes the site.
final class DemoImportTest extends FunctionalTestCase
{
    protected array $coreExtensionsToLoad = ['impexp', 'form', 'felogin', 'indexed_search', 'rte_ckeditor', 'seo'];

    protected array $testExtensionsToLoad = ['b13/container', 'typo3/theme-kumano-kodo', 'typo3/theme-kumano-kodo-demo'];

    private array $site;

    protected function setUp(): void
    {
        parent::setUp();
        $this->importCsvDataSet(__DIR__ . '/Fixtures/be_users.csv');
        $this->importCsvDataSet(__DIR__ . '/Fixtures/OtherSite.csv');
        $GLOBALS['BE_USER'] = $this->setUpBackendUser(1);
        // As extension:setup: the import's reference index reads the backend language.
        $GLOBALS['LANG'] = $this->get(LanguageServiceFactory::class)->create('en');
        $package = $this->get(PackageManager::class)->getPackage('theme_kumano_kodo_demo');
        $this->get(PackageSetup::class)->setup(['theme_kumano_kodo_demo' => $package]);
        $this->site = $this->get(SiteConfiguration::class)->load('kumano-kodo');
    }

    private function page(int $uid): array
    {
        return $this->get(ConnectionPool::class)->getConnectionForTable('pages')->select(['*'], 'pages', ['uid' => $uid])->fetchAssociative() ?: [];
    }

    #[Test]
    public function siteConfigurationPointsAtTheImportedPages(): void
    {
        self::assertSame('Home', $this->page((int)$this->site['rootPageId'])['title'] ?? null);
        $errorPages = array_map(
            fn(array $handler): string => $this->page((int)preg_replace('/^t3:\/\/page\?uid=/', '', $handler['errorContentSource']))['title'] ?? '',
            $this->site['errorHandling']
        );
        self::assertEqualsCanonicalizing(['Log in', 'Page not found'], $errorPages);
        $settings = $this->get(SiteSettingsFactory::class)->loadLocalSettings('kumano-kodo') ?? [];
        self::assertSame('Privacy', $this->page((int)$settings['kumanoKodo.privacy.page'])['title'] ?? null);
    }

    #[Test]
    public function walkFormIsStoredForTheImportedPluginOnly(): void
    {
        $connection = $this->get(ConnectionPool::class)->getConnectionForTable('tt_content');
        $form = $this->get(ConnectionPool::class)->getConnectionForTable('form_definition')
            ->select(['uid'], 'form_definition')->fetchOne();
        self::assertNotFalse($form);
        $plugins = $connection->select(['uid', 'pid', 'pi_flexform'], 'tt_content', ['CType' => 'form_formframework', 'sys_language_uid' => 0])->fetchAllAssociative();
        $identifiers = [];
        foreach ($plugins as $plugin) {
            preg_match('#persistenceIdentifier">\s*<value index="vDEF">([^<]*)<#', (string)$plugin['pi_flexform'], $m);
            $identifiers[(int)$plugin['uid']] = $m[1] ?? '';
        }
        self::assertSame('99', $identifiers[1], 'A form plugin of another site keeps its form.');
        self::assertContains((string)$form, $identifiers);
    }

    #[Test]
    public function importedSiteRenders(): void
    {
        // The demo's base variant answers on the DDEV host inside DDEV, on "/" elsewhere.
        $base = (string)$this->get(SiteFinder::class)->getSiteByIdentifier('kumano-kodo')->getBase();
        $base = str_contains($base, '://') ? $base : 'http://localhost' . $base;
        $response = $this->executeFrontendSubRequest(new InternalRequest(rtrim($base, '/') . '/'));
        self::assertSame(200, $response->getStatusCode());
        self::assertStringContainsString('<h1', (string)$response->getBody());
    }
}
