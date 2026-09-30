<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_text_image',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_text_image.description',
        'value' => 'kumano_text_image',
        'icon' => 'content-textpic',
        'group' => 'kumano_text',
    ],
    '--palette--;;headers, bodytext, image, --linebreak--, tx_kumanokodo_link, tx_kumanokodo_link_label, tx_kumanokodo_variant, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.text',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photo',
                'config' => [
                    'maxitems' => 1,
                    'minitems' => 1,
                ],
            ],
            'tx_kumanokodo_variant' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_text_image.variant',
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
