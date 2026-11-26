<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_callout',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_callout.description',
        'value' => 'kumano_callout',
        'icon' => 'kumano-callout',
        'group' => 'kumano_text',
    ],
    'tx_themekumanokodo_variant, --palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_eyebrow, bodytext, tx_themekumanokodo_links, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_themekumanokodo_variant' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.kumano_callout.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.highlight',
                            'value' => 'highlight',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.quote',
                            'value' => 'quote',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.infobox',
                            'value' => 'infobox',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.notice',
                            'value' => 'notice',
                        ],
                    ],
                    'default' => 'highlight',
                ],
            ],
            'header' => [
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.header.description.quote',
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
            'tx_themekumanokodo_links' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:infobox',
            ],
        ],
    ],
);
