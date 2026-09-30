<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_section',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_section.description',
        'value' => 'kumano_section',
        'icon' => 'content-container-columns-2',
        'group' => 'kumano_kodo',
    ],
    'header, subheader, --linebreak--, tx_kumanokodo_aside, tx_kumanokodo_gap, --linebreak--, tx_kumanokodo_layout, tx_kumanokodo_align, tx_kumanokodo_column_gap, tx_kumanokodo_column_a, tx_kumanokodo_column_b, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.section',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
        ],
    ],
);
