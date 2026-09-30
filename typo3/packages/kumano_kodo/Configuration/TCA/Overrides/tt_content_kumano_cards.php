<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_cards',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_cards.description',
        'value' => 'kumano_cards',
        'icon' => 'content-card',
        'group' => 'kumano_lists',
    ],
    'tx_kumanokodo_variant, --palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, tx_kumanokodo_entries, --div--;core.form.tabs:appearance, --palette--;;frames, tx_kumanokodo_columns',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_variant' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_cards.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.teaser',
                            'value' => 'teaser',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.place',
                            'value' => 'place',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.person',
                            'value' => 'person',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.cta',
                            'value' => 'cta',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.tile',
                            'value' => 'tile',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.stage',
                            'value' => 'stage',
                        ],
                    ],
                    'default' => 'teaser',
                ],
            ],
        ],
    ],
);
