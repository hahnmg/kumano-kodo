<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

// The trail journal's own elements, Route map and Chapter, in a group of their own beside the theme's.
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_journal', 'theme_kumano_kodo.journal_fields:tt_content.group.kumano_journal', 'after:default');

ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_themekumanokodo_path' => [
        'label' => 'theme_kumano_kodo.journal_fields:tt_content.tx_themekumanokodo_path',
        'config' => [
            'type' => 'text',
            'rows' => 3,
            'required' => true,
        ],
    ],
    'tx_themekumanokodo_stations' => [
        'label' => 'theme_kumano_kodo.journal_fields:tt_content.tx_themekumanokodo_stations',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_themekumanokodo_station',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_themekumanokodo_stations',
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
    'tx_themekumanokodo_day_marks' => [
        'label' => 'theme_kumano_kodo.journal_fields:tt_content.tx_themekumanokodo_day_marks',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_themekumanokodo_day_mark',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_themekumanokodo_day_marks',
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
