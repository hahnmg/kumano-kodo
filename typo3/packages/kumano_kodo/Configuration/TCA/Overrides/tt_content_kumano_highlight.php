<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_highlight',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_highlight.description',
        'value' => 'kumano_highlight',
        'icon' => 'content-special-div',
        'group' => 'kumano_kodo',
    ],
    'subheader, header, bodytext, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.text',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
        ],
    ],
);
