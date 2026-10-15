<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

// The trail journal's own elements, Route map and Chapter, in a group of their own beside the theme's.
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_journal', 'kumano_kodo.journal_fields:tt_content.group.kumano_journal', 'after:default');

ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_kumanokodo_path' => [
        'label' => 'kumano_kodo.journal_fields:tt_content.tx_kumanokodo_path',
        'config' => [
            'type' => 'text',
            'rows' => 3,
            'required' => true,
        ],
    ],
    'tx_kumanokodo_stations' => [
        'label' => 'kumano_kodo.journal_fields:tt_content.tx_kumanokodo_stations',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_station',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_stations',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
            'minitems' => 2,
        ],
    ],
    'tx_kumanokodo_day_marks' => [
        'label' => 'kumano_kodo.journal_fields:tt_content.tx_kumanokodo_day_marks',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_day_mark',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_day_marks',
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
