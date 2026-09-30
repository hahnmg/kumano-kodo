<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_text_media',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_text_media.description',
        'value' => 'kumano_text_media',
        'icon' => 'content-textpic',
        'group' => 'kumano_kodo',
    ],
    'image, header, bodytext, --linebreak--, tx_kumanokodo_link, tx_kumanokodo_link_label, tx_kumanokodo_variant, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photo',
                'config' => [
                    'maxitems' => 1,
                    'minitems' => 1,
                ],
            ],
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.text',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
            'tx_kumanokodo_variant' => [
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.left',
                            'value' => 'left',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.right',
                            'value' => 'right',
                        ],
                    ],
                    'default' => 'left',
                ],
            ],
        ],
    ],
);
