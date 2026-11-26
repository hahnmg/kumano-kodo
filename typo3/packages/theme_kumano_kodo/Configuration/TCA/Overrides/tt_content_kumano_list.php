<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_list',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_list.description',
        'value' => 'kumano_list',
        'icon' => 'kumano-list',
        'group' => 'kumano_lists',
    ],
    'tx_themekumanokodo_variant, --palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, tx_themekumanokodo_entries, media, tx_themekumanokodo_links, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_themekumanokodo_variant' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.kumano_list.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.media',
                            'value' => 'media',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.days',
                            'value' => 'days',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.downloads',
                            'value' => 'downloads',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.links',
                            'value' => 'links',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.links-stacked',
                            'value' => 'links-stacked',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.link-groups',
                            'value' => 'link-groups',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.subnav',
                            'value' => 'subnav',
                        ],
                    ],
                    'default' => 'media',
                ],
            ],
            'tx_themekumanokodo_entries' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:!=:downloads',
            ],
            'media' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.media.files',
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.media.files.description',
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:=:downloads',
                'config' => [
                    'minitems' => 1,
                ],
            ],
            'tx_themekumanokodo_links' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:media',
                'config' => [
                    'maxitems' => 1,
                ],
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_links.description.more',
            ],
        ],
    ],
);
