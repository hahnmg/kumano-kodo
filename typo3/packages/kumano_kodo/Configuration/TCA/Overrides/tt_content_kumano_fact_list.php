<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_fact_list',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_fact_list.description',
        'value' => 'kumano_fact_list',
        'icon' => 'content-table',
        'group' => 'kumano_kodo',
    ],
    'header, tx_kumanokodo_variant, tx_kumanokodo_items, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
            'tx_kumanokodo_variant' => [
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.inline',
                            'value' => 'inline',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.stacked',
                            'value' => 'stacked',
                        ],
                    ],
                    'default' => 'inline',
                ],
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'label, value',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_fact_list',
            ],
        ],
    ],
);
