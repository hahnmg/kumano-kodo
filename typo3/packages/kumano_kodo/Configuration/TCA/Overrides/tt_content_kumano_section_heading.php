<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_section_heading',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_section_heading.description',
        'value' => 'kumano_section_heading',
        'icon' => 'content-header',
        'group' => 'kumano_kodo',
    ],
    'subheader, header, tx_kumanokodo_aside, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
        ],
    ],
);
