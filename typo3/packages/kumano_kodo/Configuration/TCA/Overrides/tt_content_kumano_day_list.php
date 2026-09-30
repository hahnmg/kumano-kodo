<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_day_list',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_day_list.description',
        'value' => 'kumano_day_list',
        'icon' => 'content-bullets',
        'group' => 'kumano_kodo',
    ],
    'header, subheader, --linebreak--, tx_kumanokodo_aside, tx_kumanokodo_gap, tx_kumanokodo_items, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.section',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'label, title, text, meta',
                            ],
                        ],
                        'columns' => [
                            'label' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_day_list.label',
                            ],
                            'title' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_day_list.title',
                            ],
                            'text' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_day_list.text',
                            ],
                            'meta' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_day_list.meta',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_day_list',
            ],
        ],
    ],
);
