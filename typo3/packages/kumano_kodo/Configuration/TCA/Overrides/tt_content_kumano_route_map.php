<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_route_map',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_route_map.description',
        'value' => 'kumano_route_map',
        'icon' => 'content-special-html',
        'group' => 'kumano_kodo',
    ],
    'header, subheader, --linebreak--, tx_kumanokodo_aside, tx_kumanokodo_gap, --linebreak--, tx_kumanokodo_meta, tx_kumanokodo_path, --linebreak--, tx_kumanokodo_legend_walked, tx_kumanokodo_legend_end, tx_kumanokodo_legend_boundary, tx_kumanokodo_items, tx_kumanokodo_items2, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.section',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'tx_kumanokodo_meta' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_meta.maplabel',
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'title, --linebreak--, x, y, label_y, --linebreak--, anchor, boundary',
                            ],
                        ],
                        'columns' => [
                            'title' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_route_map.title',
                            ],
                        ],
                    ],
                    'minitems' => 2,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_route_map',
            ],
            'tx_kumanokodo_items2' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'label, x',
                            ],
                        ],
                        'columns' => [
                            'label' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_route_map.label',
                            ],
                        ],
                    ],
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items2.kumano_route_map',
            ],
        ],
    ],
);
