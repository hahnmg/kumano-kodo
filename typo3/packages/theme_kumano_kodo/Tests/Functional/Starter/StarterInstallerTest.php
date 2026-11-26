<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Tests\Functional\Starter;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Configuration\SiteConfiguration;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\ThemeKumanoKodo\Starter\StarterException;
use TYPO3\CMS\ThemeKumanoKodo\Starter\StarterInstaller;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

final class StarterInstallerTest extends FunctionalTestCase
{
    protected array $coreExtensionsToLoad = ['impexp', 'rte_ckeditor'];

    protected array $testExtensionsToLoad = ['b13/container', 'typo3/theme-kumano-kodo'];

    protected function setUp(): void
    {
        parent::setUp();
        $this->importCsvDataSet(__DIR__ . '/../Fixtures/be_users.csv');
        $this->setUpBackendUser(1);
        $this->get(SiteWriter::class)->write('existing', [
            'rootPageId' => 1,
            'base' => '/',
            'languages' => [['languageId' => 0, 'title' => 'English', 'locale' => 'en_US.UTF-8', 'base' => '/']],
        ]);
    }

    private function pageCount(): int
    {
        return (int)$this->get(ConnectionPool::class)->getConnectionForTable('pages')->count('*', 'pages', ['deleted' => 0]);
    }

    public static function refusedSites(): array
    {
        return [
            'identifier with spaces' => ['Bad Name', '/x/', 'error.identifier'],
            'identifier taken' => ['existing', '/x/', 'error.identifierTaken'],
            'base without slash' => ['starter', 'x', 'error.base'],
            'base taken' => ['starter', '/', 'error.baseTaken'],
        ];
    }

    #[Test]
    #[DataProvider('refusedSites')]
    public function refusesBeforeImporting(string $identifier, string $base, string $label): void
    {
        try {
            $this->get(StarterInstaller::class)->create($identifier, $base);
            self::fail('No exception');
        } catch (StarterException $e) {
            self::assertSame($label, $e->label);
        }
        self::assertSame(0, $this->pageCount());
    }

    #[Test]
    public function createsTheStarterOnItsBase(): void
    {
        $site = $this->get(StarterInstaller::class)->create('starter', '/starter/');
        $configuration = $this->get(SiteConfiguration::class)->load('starter');
        self::assertSame('/starter/', $configuration['base']);
        self::assertSame($site['rootPageId'], $configuration['rootPageId']);
        self::assertGreaterThan(0, $this->pageCount());
    }
}
