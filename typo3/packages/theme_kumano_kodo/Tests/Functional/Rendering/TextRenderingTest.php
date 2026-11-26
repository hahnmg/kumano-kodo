<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Tests\Functional\Rendering;

use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\TestingFramework\Core\Functional\Framework\Frontend\InternalRequest;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

final class TextRenderingTest extends FunctionalTestCase
{
    protected array $coreExtensionsToLoad = ['rte_ckeditor'];

    protected array $testExtensionsToLoad = ['b13/container', 'typo3/theme-kumano-kodo'];

    protected function setUp(): void
    {
        parent::setUp();
        $this->importCsvDataSet(__DIR__ . '/../Fixtures/Texts.csv');
        $this->get(SiteWriter::class)->write('kumano', [
            'rootPageId' => 1,
            'base' => 'https://kumano.example/',
            'dependencies' => ['typo3/theme-kumano-kodo'],
            'languages' => [['languageId' => 0, 'title' => 'English', 'locale' => 'en_US.UTF-8', 'base' => '/']],
        ]);
    }

    private function render(): string
    {
        return (string)$this->executeFrontendSubRequest(new InternalRequest('https://kumano.example/'))->getBody();
    }

    #[Test]
    public function plainTextIsEscapedOnce(): void
    {
        $content = $this->render();
        self::assertStringContainsString('Walk &amp; &lt;talk&gt;', $content);
        self::assertStringContainsString('Questions &amp; &lt;answers&gt;', $content);
        self::assertStringContainsString('Card &amp; &lt;b&gt;', $content);
        self::assertStringNotContainsString('&amp;amp;', $content);
    }

    #[Test]
    public function richTextKeepsItsParagraphsInsideTheLead(): void
    {
        self::assertMatchesRegularExpression('#<div class="type-lead">\s*<p>Lead &amp; text</p>\s*<p>Second paragraph</p>#', $this->render());
    }

    #[Test]
    public function lineBreaksOfPlainTextFieldsAreKept(): void
    {
        self::assertMatchesRegularExpression('#Line one<br\s*/?>\s*line two#', $this->render());
    }
}
