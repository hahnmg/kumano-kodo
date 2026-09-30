<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_facts',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_facts.description',
        'value' => 'kumano_facts',
        'icon' => 'content-table',
        'group' => 'kumano_lists',
    ],
    'tx_kumanokodo_variant, tx_kumanokodo_columns, --palette--;;headers, tx_kumanokodo_facts, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_variant' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_facts.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.icons',
                            'value' => 'icons',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.figures',
                            'value' => 'figures',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.pairs',
                            'value' => 'pairs',
                        ],
                    ],
                    'default' => 'icons',
                ],
            ],
            'tx_kumanokodo_columns' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:icons',
                'config' => [
                    'default' => '4',
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns.2',
                            'value' => '2',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns.3',
                            'value' => '3',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns.4',
                            'value' => '4',
                        ],
                    ],
                ],
            ],
            'tx_kumanokodo_facts' => [
                'config' => [
                    'minitems' => 1,
                ],
            ],
        ],
    ],
);
