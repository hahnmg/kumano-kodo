<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_images',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_images.description',
        'value' => 'kumano_images',
        'icon' => 'kumano-images',
        'group' => 'kumano_text',
    ],
    'tx_themekumanokodo_variant, --palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, bodytext, --div--;core.form.tabs:images, image, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_themekumanokodo_variant' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.kumano_images.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.figure',
                            'value' => 'figure',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.figure-plain',
                            'value' => 'figure-plain',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.gallery',
                            'value' => 'gallery',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.fullwidth',
                            'value' => 'fullwidth',
                        ],
                    ],
                    'default' => 'figure',
                ],
            ],
            'image' => [
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.image.description.video',
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
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.bodytext.description.caption',
            ],
        ],
    ],
);
