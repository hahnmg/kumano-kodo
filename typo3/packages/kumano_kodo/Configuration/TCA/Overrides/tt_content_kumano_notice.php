<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_notice',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_notice.description',
        'value' => 'kumano_notice',
        'icon' => 'content-info',
        'group' => 'kumano_kodo',
    ],
    '
            header,
            bodytext,
        ',
    [
        'columnsOverrides' => [
            'header' => [
                'config' => ['required' => true],
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_notice.bodytext',
                'config' => ['type' => 'text', 'rows' => 3, 'required' => true],
            ],
        ],
    ],
);
