<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_journal_opener',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_journal_opener.description',
        'value' => 'kumano_journal_opener',
        'icon' => 'content-header',
        'group' => 'kumano_kodo',
    ],
    'subheader, header, bodytext, tx_kumanokodo_meta, tx_kumanokodo_vertical',
    [
        'columnsOverrides' => [
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.kicker',
            ],
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.lede',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
        ],
    ],
);
