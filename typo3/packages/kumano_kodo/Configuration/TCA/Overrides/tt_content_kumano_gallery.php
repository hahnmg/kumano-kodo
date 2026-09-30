<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_gallery',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_gallery.description',
        'value' => 'kumano_gallery',
        'icon' => 'content-image',
        'group' => 'kumano_kodo',
    ],
    'header, subheader, --linebreak--, tx_kumanokodo_aside, tx_kumanokodo_gap, image, bodytext, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.section',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photos',
                'config' => [
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
