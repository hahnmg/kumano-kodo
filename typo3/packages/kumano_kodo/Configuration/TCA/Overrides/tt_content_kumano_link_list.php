<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_link_list',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_link_list.description',
        'value' => 'kumano_link_list',
        'icon' => 'content-menu-pages',
        'group' => 'kumano_kodo',
    ],
    '
            header,
            tx_kumanokodo_links,
        ',
    [
        'columnsOverrides' => [
            'header' => [
                'description' => 'kumano_kodo.backend_fields:tt_content.kumano_link_list.header.description',
            ],
        ],
    ],
);
