<?php

declare(strict_types=1);

namespace KumanoKodo\Sitepackage\DataProcessing;

use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\Restriction\FrontendRestrictionContainer;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

// A chapter's numeral is its place among the chapters of its column, so editors never renumber by hand.
final class ChapterNumberProcessor implements DataProcessorInterface
{
    public function __construct(private readonly ConnectionPool $connectionPool) {}

    public function process(ContentObjectRenderer $cObj, array $contentObjectConfiguration, array $processorConfiguration, array $processedData): array
    {
        $row = $cObj->data;
        // Translations share the sorting of their default record; the count runs over the default language.
        $sorting = (int)($row['sorting'] ?? 0);
        if ((int)($row['l18n_parent'] ?? 0) > 0) {
            $sorting = (int)$this->connectionPool->getConnectionForTable('tt_content')
                ->select(['sorting'], 'tt_content', ['uid' => (int)$row['l18n_parent']])->fetchOne();
        }
        $query = $this->connectionPool->getQueryBuilderForTable('tt_content');
        $query->setRestrictions(new FrontendRestrictionContainer());
        $before = (int)$query->count('uid')->from('tt_content')->where(
            $query->expr()->eq('pid', $query->createNamedParameter((int)$row['pid'])),
            $query->expr()->eq('colPos', $query->createNamedParameter((int)$row['colPos'])),
            $query->expr()->eq('tx_container_parent', $query->createNamedParameter((int)($row['tx_container_parent'] ?? 0))),
            $query->expr()->eq('CType', $query->createNamedParameter('kumano_chapter')),
            $query->expr()->in('sys_language_uid', [0, -1]),
            $query->expr()->lt('sorting', $query->createNamedParameter($sorting)),
        )->executeQuery()->fetchOne();
        $processedData[$processorConfiguration['as'] ?? 'number'] = $before + 1;
        return $processedData;
    }
}
