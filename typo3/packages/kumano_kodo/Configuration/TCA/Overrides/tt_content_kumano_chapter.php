<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_chapter',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_chapter.description',
        'value' => 'kumano_chapter',
        'icon' => 'content-textpic',
        'group' => 'kumano_journal',
    ],
    'tx_kumanokodo_number, subheader, header, bodytext, image, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.date',
            ],
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.title',
                'config' => [
                    'required' => true,
                ],
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.text',
                'config' => [
                    'enableRichtext' => false,
                    'rows' => 4,
                ],
            ],
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photos',
                'config' => [
                    'minitems' => 1,
                    'overrideChildTca' => [
                        'types' => [
                            '2' => [
                                'showitem' => '--palette--;;imageoverlayPalette, --palette--;;kumanokodo_chapter_photo, --palette--;;filePalette',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
);
