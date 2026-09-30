<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_media_list',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_media_list.description',
        'value' => 'kumano_media_list',
        'icon' => 'content-menu-thumbnail',
        'group' => 'kumano_kodo',
    ],
    'header, tx_kumanokodo_items, --linebreak--, tx_kumanokodo_link, tx_kumanokodo_link_label, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'image, title, meta, link',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_media_list',
            ],
        ],
    ],
);
