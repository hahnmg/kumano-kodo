<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.journal_fields:tt_content.CType.kumano_chapter',
        'description' => 'theme_kumano_kodo.journal_fields:tt_content.CType.kumano_chapter.description',
        'value' => 'kumano_chapter',
        'icon' => 'kumano-chapter',
        'group' => 'kumano_journal',
    ],
    '--palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_eyebrow, bodytext, --div--;core.form.tabs:images, image, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'header' => [
                'config' => [
                    'required' => true,
                ],
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
            'image' => [
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
