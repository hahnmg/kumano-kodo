<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_questions',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_questions.description',
        'value' => 'kumano_questions',
        'icon' => 'kumano-questions',
        'group' => 'kumano_text',
    ],
    '--palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_eyebrow, bodytext, tx_themekumanokodo_questions, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
        ],
    ],
);
