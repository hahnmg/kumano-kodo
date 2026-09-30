<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_quote',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_quote.description',
        'value' => 'kumano_quote',
        'icon' => 'content-quote',
        'group' => 'kumano_kodo',
    ],
    'bodytext, subheader, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.quote',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.source',
            ],
        ],
    ],
);
