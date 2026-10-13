<?php

declare(strict_types=1);

namespace KumanoKodo\Demo\Form;

use Doctrine\DBAL\ParameterType;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Form\Command\TransferFormDefinitionCommand;

// The demo form shows a content element by uid, and uids change with every build and import. Its definition is a
// template in the package, stored in the form database by the build and again after an import: EXT:form keeps
// impexp from writing form records.
final readonly class WalkForm
{
    public const TEMPLATE = 'EXT:kumano_kodo_demo/Resources/Private/Forms/walk.form.yaml';
    public const IDENTIFIER = 'walk';
    /** What the plugins carry in Build/Demo/content.json until the form has a uid. */
    public const PLACEHOLDER = 'form:walk';
    /** The key of the element in Build/Demo/content.json. */
    public const CONTENT_KEY = 'walk-luggage';
    private const TABLE = 'form_definition';

    public function __construct(
        private ConnectionPool $connectionPool,
        private TransferFormDefinitionCommand $transfer,
    ) {}

    public function templateUid(): int
    {
        preg_match('/contentElementUid: (\d+)/', $this->template(), $m);
        return (int)($m[1] ?? 0);
    }

    // The build records the uid in the template too, so the stored form carries it and an import can map it.
    public function setTemplateUid(int $uid): void
    {
        file_put_contents($this->templatePath(), (string)preg_replace('/contentElementUid: \d+/', 'contentElementUid: ' . $uid, $this->template()));
    }

    // The build: the plugins carry a placeholder until the form has a uid.
    public function storeInDatabase(): int
    {
        $uid = $this->createRecord();
        $this->replaceInPlugins(fn (string $value): bool => $value === self::PLACEHOLDER, $uid);
        return $uid;
    }

    // An import: the element has a new uid, and the plugins still name the form record of the exported instance.
    public function restoreAfterImport(int $exportedElement, int $importedElement): void
    {
        $uid = $this->createRecord();
        $connection = $this->connectionPool->getConnectionForTable(self::TABLE);
        $row = $connection->select(['configuration'], self::TABLE, ['uid' => $uid])->fetchAssociative();
        $configuration = (string)preg_replace('/"contentElementUid":\s*"?' . $exportedElement . '"?/', '"contentElementUid":' . $importedElement, (string)($row['configuration'] ?? ''));
        // A JSON column: passed as text, or the connection would encode the encoded definition once more.
        $connection->update(self::TABLE, ['configuration' => $configuration], ['uid' => $uid], ['configuration' => ParameterType::STRING]);
        $this->replaceInPlugins(fn (string $value): bool => ctype_digit($value), $uid);
    }

    // The core's transfer command writes the record in its own format, under a unique identifier such as walk_1, as
    // the template keeps "walk". Earlier copies go first.
    private function createRecord(): int
    {
        $connection = $this->connectionPool->getConnectionForTable(self::TABLE);
        foreach ($this->records() as $row) {
            $connection->delete(self::TABLE, ['uid' => $row['uid']]);
        }
        $this->transfer->run(new ArrayInput([
            '--source' => 'extension',
            '--target' => 'database',
            '--form-identifier' => self::IDENTIFIER,
        ]), new NullOutput());
        $uid = (int)($this->records()[0]['uid'] ?? 0);
        if ($uid === 0) {
            throw new \RuntimeException('The walk form did not reach the form database.', 1792000001);
        }
        return $uid;
    }

    /** @return list<array{uid: int, configuration: string}> the stored copies of the template, newest first */
    private function records(): array
    {
        $query = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $query->getRestrictions()->removeAll();
        $rows = $query->select('uid', 'identifier', 'configuration')->from(self::TABLE)->orderBy('uid', 'DESC')->executeQuery()->fetchAllAssociative();
        return array_values(array_filter($rows, static fn (array $row): bool => preg_match('/^' . self::IDENTIFIER . '(_\d+)?$/', (string)$row['identifier']) === 1));
    }

    /** @param \Closure(string): bool $matches which persistence identifiers point at this form */
    private function replaceInPlugins(\Closure $matches, int $uid): void
    {
        $connection = $this->connectionPool->getConnectionForTable('tt_content');
        foreach ($connection->select(['uid', 'pi_flexform'], 'tt_content', ['CType' => 'form_formframework'])->fetchAllAssociative() as $row) {
            $flexform = (string)preg_replace_callback(
                '/(<field index="settings\.persistenceIdentifier">\s*<value index="vDEF">)([^<]*)(<\/value>)/',
                fn (array $m): string => $matches($m[2]) ? $m[1] . $uid . $m[3] : $m[0],
                (string)$row['pi_flexform'],
            );
            if ($flexform !== $row['pi_flexform']) {
                $connection->update('tt_content', ['pi_flexform' => $flexform], ['uid' => $row['uid']]);
            }
        }
    }

    private function template(): string
    {
        return (string)file_get_contents($this->templatePath());
    }

    private function templatePath(): string
    {
        return GeneralUtility::getFileAbsFileName(self::TEMPLATE);
    }
}
