<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_table',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_table.description',
        'value' => 'kumano_table',
        'icon' => 'content-table',
        'group' => 'kumano_kodo',
    ],
    'header, bodytext, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.caption',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.rows',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 8,
                ],
            ],
        ],
    ],
);
