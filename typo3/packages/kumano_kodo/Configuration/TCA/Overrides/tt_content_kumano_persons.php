<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_persons',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_persons.description',
        'value' => 'kumano_persons',
        'icon' => 'content-user',
        'group' => 'kumano_kodo',
    ],
    'header, subheader, --linebreak--, tx_kumanokodo_aside, tx_kumanokodo_gap, tx_kumanokodo_columns, tx_kumanokodo_items, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
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
                                'showitem' => 'image, --linebreak--, title, subtitle, text',
                            ],
                        ],
                        'columns' => [
                            'title' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_persons.title',
                            ],
                            'subtitle' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_persons.subtitle',
                            ],
                            'text' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_persons.text',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_persons',
            ],
        ],
    ],
);
