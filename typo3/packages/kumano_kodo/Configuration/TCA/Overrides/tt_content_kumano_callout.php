<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_callout',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_callout.description',
        'value' => 'kumano_callout',
        'icon' => 'content-info',
        'group' => 'kumano_text',
    ],
    'tx_kumanokodo_variant, header, subheader, bodytext, tx_kumanokodo_list_items, --div--;core.form.tabs:appearance, --palette--;;frames',
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
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow_source',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.text',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
            'tx_kumanokodo_list_items' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:infobox',
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_callout.links',
                'config' => [
                    'minitems' => 0,
                ],
            ],
        ],
    ],
);
