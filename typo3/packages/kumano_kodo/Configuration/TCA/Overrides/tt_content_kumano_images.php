<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_images',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_images.description',
        'value' => 'kumano_images',
        'icon' => 'content-image',
        'group' => 'kumano_text',
    ],
    'tx_kumanokodo_variant, --palette--;;headers, image, bodytext, tx_kumanokodo_rule, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_variant' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.kumano_images.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.figure',
                            'value' => 'figure',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.gallery',
                            'value' => 'gallery',
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.fullwidth',
                            'value' => 'fullwidth',
                        ],
                    ],
                    'default' => 'figure',
                ],
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
            'tx_kumanokodo_rule' => [
                'displayCond' => 'FIELD:tx_kumanokodo_variant:IN:figure',
            ],
        ],
    ],
);
