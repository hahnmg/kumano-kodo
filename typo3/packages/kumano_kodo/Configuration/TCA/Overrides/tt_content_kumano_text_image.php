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
    '--palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_plain, bodytext, tx_kumanokodo_links, --div--;core.form.tabs:images, image, --div--;core.form.tabs:appearance, --palette--;;frames, imageorient',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
            'image' => [
                'config' => [
                    'maxitems' => 1,
                    'minitems' => 1,
                ],
            ],
            'tx_kumanokodo_links' => [
                'config' => [
                    'maxitems' => 1,
                ],
            ],
            'imageorient' => [
                'config' => [
                    'items' => [
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.imageorient.left',
                            'value' => 26,
                        ],
                        [
                            'label' => 'kumano_kodo.backend_fields:tt_content.imageorient.right',
                            'value' => 25,
                        ],
                    ],
                    'default' => 26,
                ],
            ],
        ],
    ],
);
