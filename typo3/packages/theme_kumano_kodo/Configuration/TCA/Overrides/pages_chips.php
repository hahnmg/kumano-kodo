<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTCAcolumns('pages', [
    'tx_themekumanokodo_chips' => [
        'label' => 'theme_kumano_kodo.backend_fields:pages.tx_themekumanokodo_chips',
        'description' => 'theme_kumano_kodo.backend_fields:pages.tx_themekumanokodo_chips.description',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_themekumanokodo_entry',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_themekumanokodo_chips',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
            'overrideChildTca' => [
                'types' => [
                    '0' => [
                        'showitem' => '--palette--;;chip',
                    ],
                ],
                'palettes' => [
                    'chip' => [
                        'showitem' => 'title, link, active',
                    ],
                ],
            ],
        ],
    ],
]);

ExtensionManagementUtility::addToAllTCAtypes('pages', 'tx_themekumanokodo_chips', '1', 'after:subtitle');
