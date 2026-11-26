<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_cards',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_cards.description',
        'value' => 'kumano_cards',
        'icon' => 'kumano-cards',
        'group' => 'kumano_lists',
    ],
    'tx_themekumanokodo_variant, --palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, tx_themekumanokodo_entries, --div--;core.form.tabs:appearance, --palette--;;frames, tx_themekumanokodo_columns, tx_themekumanokodo_edge',
    [
        'columnsOverrides' => [
            'tx_themekumanokodo_edge' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:cta,teaser,tile',
            ],
            'tx_themekumanokodo_variant' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.kumano_cards.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.teaser',
                            'value' => 'teaser',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.place',
                            'value' => 'place',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.person',
                            'value' => 'person',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.cta',
                            'value' => 'cta',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.tile',
                            'value' => 'tile',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.stage',
                            'value' => 'stage',
                        ],
                    ],
                    'default' => 'teaser',
                ],
            ],
        ],
    ],
);
