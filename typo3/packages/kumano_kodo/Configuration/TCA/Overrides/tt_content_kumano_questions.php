<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_questions',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_questions.description',
        'value' => 'kumano_questions',
        'icon' => 'content-bullets',
        'group' => 'kumano_text',
    ],
    '--palette--;;headers, bodytext, tx_kumanokodo_questions, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.intro',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
        ],
    ],
);
