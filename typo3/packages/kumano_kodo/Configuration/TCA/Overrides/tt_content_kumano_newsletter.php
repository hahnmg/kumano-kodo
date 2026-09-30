<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_newsletter',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_newsletter.description',
        'value' => 'kumano_newsletter',
        'icon' => 'content-form',
        'group' => 'kumano_text',
    ],
    '--palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_plain, bodytext, --div--;core.form.tabs:appearance, --palette--;;frames',
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
