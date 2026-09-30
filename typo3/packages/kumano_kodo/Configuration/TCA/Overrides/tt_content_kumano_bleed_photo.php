<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_bleed_photo',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_bleed_photo.description',
        'value' => 'kumano_bleed_photo',
        'icon' => 'content-image',
        'group' => 'kumano_kodo',
    ],
    'image, bodytext',
    [
        'columnsOverrides' => [
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photo',
                'config' => [
                    'maxitems' => 1,
                    'minitems' => 1,
                ],
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.caption',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
        ],
    ],
);
