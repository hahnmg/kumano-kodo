<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_list',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_list.description',
        'value' => 'kumano_list',
        'icon' => 'kumano-list',
        'group' => 'kumano_lists',
    ],
    'tx_kumanokodo_variant, --palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, tx_kumanokodo_entries, media, tx_kumanokodo_links, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_variant' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_list.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.media',
                            'value' => 'media',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.days',
                            'value' => 'days',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.downloads',
                            'value' => 'downloads',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.links',
                            'value' => 'links',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.links-stacked',
                            'value' => 'links-stacked',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.link-groups',
                            'value' => 'link-groups',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.subnav',
                            'value' => 'subnav',
                        ],
                    ],
                    'default' => 'media',
                ],
            ],
            'tx_kumanokodo_entries' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:!=:downloads',
            ],
            'media' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.media.files',
                'description' => 'kumano_kodo.backend_fields:tt_content.media.files.description',
                'displayCond' => 'FIELD:tx_kumanokodo_variant:=:downloads',
                'config' => [
                    'minitems' => 1,
                ],
            ],
            'tx_kumanokodo_links' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:media',
                'config' => [
                    'maxitems' => 1,
                ],
                'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_links.description.more',
            ],
        ],
    ],
);
