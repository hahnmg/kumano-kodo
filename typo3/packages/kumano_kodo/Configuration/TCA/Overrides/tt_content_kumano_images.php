<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_images',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_images.description',
        'value' => 'kumano_images',
        'icon' => 'kumano-images',
        'group' => 'kumano_text',
    ],
    'tx_kumanokodo_variant, --palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, bodytext, --div--;core.form.tabs:images, image, --div--;core.form.tabs:appearance, --palette--;;frames',
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
                            'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.figure-plain',
                            'value' => 'figure-plain',
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
                'description' => 'kumano_kodo.backend_fields:tt_content.image.description.video',
                'config' => [
                    'allowed' => 'common-image-types,mp4,webm,youtube,vimeo',
                    'minitems' => 1,
                ],
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
                'description' => 'kumano_kodo.backend_fields:tt_content.bodytext.description.caption',
            ],
        ],
    ],
);
