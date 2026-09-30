<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_page_top',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_page_top.description',
        'value' => 'kumano_page_top',
        'icon' => 'content-header',
        'group' => 'kumano_text',
    ],
    'tx_kumanokodo_variant, image, subheader, tx_kumanokodo_heading, bodytext, tx_kumanokodo_meta, tx_kumanokodo_vertical, --linebreak--, tx_kumanokodo_link, tx_kumanokodo_link_label, tx_kumanokodo_list_items, tx_kumanokodo_link2, tx_kumanokodo_link2_label, tx_kumanokodo_facts',
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
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.hero_list',
                            'value' => 'hero_list',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.opener',
                            'value' => 'opener',
                        ],
                    ],
                    'default' => 'hero',
                ],
            ],
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photo',
                'config' => [
                    'maxitems' => 1,
                ],
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.kicker',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.text',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
            'tx_kumanokodo_meta' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:opener',
            ],
            'tx_kumanokodo_vertical' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:opener',
            ],
            'tx_kumanokodo_link' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero_list',
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_page_top.button',
            ],
            'tx_kumanokodo_link_label' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero_list',
            ],
            'tx_kumanokodo_list_items' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero,hero_list',
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_page_top.list',
                'config' => [
                    'minitems' => 0,
                ],
            ],
            'tx_kumanokodo_link2' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero_list',
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_page_top.more',
            ],
            'tx_kumanokodo_link2_label' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero_list',
            ],
            'tx_kumanokodo_facts' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:hero',
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_page_top.figures',
            ],
        ],
    ],
);
