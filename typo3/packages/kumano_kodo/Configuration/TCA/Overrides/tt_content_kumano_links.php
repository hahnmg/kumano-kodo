<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_links',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_links.description',
        'value' => 'kumano_links',
        'icon' => 'content-menu-pages',
        'group' => 'kumano_kodo',
    ],
    'tx_kumanokodo_variant, tx_kumanokodo_items, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_variant' => [
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.cluster',
                            'value' => 'cluster',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.stack',
                            'value' => 'stack',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.plain',
                            'value' => 'plain',
                        ],
                    ],
                    'default' => 'cluster',
                ],
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'link_label, link, direction',
                            ],
                        ],
                        'columns' => [
                            'link_label' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_links.link_label',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_links',
            ],
        ],
    ],
);
