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
        'group' => 'kumano_kodo',
    ],
    'tx_kumanokodo_number, subheader, header, bodytext, tx_kumanokodo_items',
    [
        'columnsOverrides' => [
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.date',
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
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'image, --linebreak--, span, shift',
                            ],
                        ],
                        'columns' => [
                            'image' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_chapter.image',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_chapter',
            ],
        ],
    ],
);
