<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_list',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_list.description',
        'value' => 'kumano_list',
        'icon' => 'content-bullets',
        'group' => 'kumano_lists',
    ],
    'tx_kumanokodo_variant, --palette--;;headers, tx_kumanokodo_list_items, --linebreak--, tx_kumanokodo_link, tx_kumanokodo_link_label, --div--;core.form.tabs:appearance, --palette--;;frames',
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
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.subnav',
                            'value' => 'subnav',
                        ],
                    ],
                    'default' => 'media',
                ],
            ],
            'tx_kumanokodo_link' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:media',
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_list.more',
            ],
            'tx_kumanokodo_link_label' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:media',
            ],
        ],
    ],
);
