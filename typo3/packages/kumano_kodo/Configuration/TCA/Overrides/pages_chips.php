<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTCAcolumns('pages', [
    'tx_kumanokodo_chips' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_chips',
        'description' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_chips.description',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_list_item',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_chips',
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
                        'showitem' => 'title, link, active',
                    ],
                ],
            ],
        ],
    ],
]);

ExtensionManagementUtility::addToAllTCAtypes('pages', 'tx_kumanokodo_chips', '1', 'after:subtitle');
