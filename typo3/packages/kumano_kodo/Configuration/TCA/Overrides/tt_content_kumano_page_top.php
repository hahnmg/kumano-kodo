<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_page_top',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_page_top.description',
        'value' => 'kumano_page_top',
        'icon' => 'kumano-page-top',
        'group' => 'kumano_text',
    ],
    'tx_kumanokodo_variant, --palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_eyebrow, bodytext, tx_kumanokodo_meta, tx_kumanokodo_facts, tx_kumanokodo_links, --div--;core.form.tabs:images, image, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_variant' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_page_top.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.hero',
                            'value' => 'hero',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.text',
                            'value' => 'text',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.opener',
                            'value' => 'opener',
                        ],
                    ],
                    'default' => 'hero',
                ],
            ],
            'header' => [
                'config' => [
                    'type' => 'text',
                    'rows' => 2,
                    'required' => true,
                ],
                'description' => 'kumano_kodo.backend_fields:tt_content.header.description.lines',
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
            'image' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero',
                'config' => [
                    'maxitems' => 1,
                ],
            ],
            'tx_kumanokodo_meta' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:opener',
            ],
            'tx_kumanokodo_facts' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero',
                'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_facts.description.hero',
            ],
            'tx_kumanokodo_links' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero,text',
                'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_links.description.buttons',
            ],
        ],
    ],
);
