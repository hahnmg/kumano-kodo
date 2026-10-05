<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_callout',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_callout.description',
        'value' => 'kumano_callout',
        'icon' => 'kumano-callout',
        'group' => 'kumano_text',
    ],
    'tx_kumanokodo_variant, --palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_eyebrow, bodytext, tx_kumanokodo_links, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_variant' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_callout.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.highlight',
                            'value' => 'highlight',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.quote',
                            'value' => 'quote',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.infobox',
                            'value' => 'infobox',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.notice',
                            'value' => 'notice',
                        ],
                    ],
                    'default' => 'highlight',
                ],
            ],
            'header' => [
                'description' => 'kumano_kodo.backend_fields:tt_content.header.description.quote',
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
            'tx_kumanokodo_links' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:infobox',
            ],
        ],
    ],
);
