<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_figure',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_figure.description',
        'value' => 'kumano_figure',
        'icon' => 'content-image',
        'group' => 'kumano_kodo',
    ],
    'image, bodytext, tx_kumanokodo_rule, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photos',
                'config' => [
                    'maxitems' => 2,
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
