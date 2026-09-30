<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_sub_nav',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_sub_nav.description',
        'value' => 'kumano_sub_nav',
        'icon' => 'content-menu-pages',
        'group' => 'kumano_kodo',
    ],
    'header, tx_kumanokodo_links, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
        ],
    ],
);
