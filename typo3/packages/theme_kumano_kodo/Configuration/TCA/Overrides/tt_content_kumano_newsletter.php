<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_newsletter',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_newsletter.description',
        'value' => 'kumano_newsletter',
        'icon' => 'kumano-newsletter',
        'group' => 'kumano_text',
    ],
    '--palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_plain, bodytext, --div--;core.form.tabs:appearance, --palette--;;frames',
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
