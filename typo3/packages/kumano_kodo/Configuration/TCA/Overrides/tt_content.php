<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTcaSelectItemGroup(
    'tt_content',
    'CType',
    'kumano_kodo',
    'kumano_kodo.backend_fields:tt_content.group.kumano_kodo',
    'after:default'
);

ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_kumanokodo_links' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_links',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_link',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_links',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
        ],
    ],
]);
