<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_text_image',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_text_image.description',
        'value' => 'kumano_text_image',
        'icon' => 'kumano-text-image',
        'group' => 'kumano_text',
    ],
    '--palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_plain, bodytext, tx_themekumanokodo_links, --div--;core.form.tabs:images, image, --div--;core.form.tabs:appearance, --palette--;;frames, imageorient',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
            'image' => [
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.image.description.video',
                'config' => [
                    'allowed' => 'common-image-types,mp4,webm,youtube,vimeo',
                    // A video and its poster.
                    'maxitems' => 2,
                    'minitems' => 1,
                ],
            ],
            'tx_themekumanokodo_links' => [
                'config' => [
                    'maxitems' => 1,
                ],
            ],
            'imageorient' => [
                'config' => [
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.imageorient.left',
                            'value' => 26,
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.imageorient.right',
                            'value' => 25,
                        ],
                    ],
                    'default' => 26,
                ],
            ],
        ],
    ],
);
