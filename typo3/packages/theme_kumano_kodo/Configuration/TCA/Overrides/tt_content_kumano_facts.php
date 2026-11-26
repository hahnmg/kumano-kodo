<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_facts',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_facts.description',
        'value' => 'kumano_facts',
        'icon' => 'kumano-facts',
        'group' => 'kumano_lists',
    ],
    'tx_themekumanokodo_variant, --palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, tx_themekumanokodo_facts, --div--;core.form.tabs:appearance, --palette--;;frames, tx_themekumanokodo_columns',
    [
        'columnsOverrides' => [
            'tx_themekumanokodo_variant' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.kumano_facts.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.icons',
                            'value' => 'icons',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.figures',
                            'value' => 'figures',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.pairs',
                            'value' => 'pairs',
                        ],
                    ],
                    'default' => 'icons',
                ],
            ],
            'tx_themekumanokodo_columns' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:icons',
                'config' => [
                    'default' => '4',
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns.2',
                            'value' => '2',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns.3',
                            'value' => '3',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns.4',
                            'value' => '4',
                        ],
                    ],
                ],
            ],
            'tx_themekumanokodo_facts' => [
                'config' => [
                    'minitems' => 1,
                ],
            ],
        ],
    ],
);
