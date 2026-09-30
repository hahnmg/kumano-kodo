<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_hero',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_hero.description',
        'value' => 'kumano_hero',
        'icon' => 'content-image',
        'group' => 'kumano_kodo',
    ],
    'image, subheader, tx_kumanokodo_heading, bodytext, tx_kumanokodo_items, tx_kumanokodo_items2',
    [
        'columnsOverrides' => [
            'image' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.image.photo',
                'config' => [
                    'maxitems' => 1,
                    'minitems' => 1,
                ],
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.teaser',
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
                                'showitem' => 'link_label, link',
                            ],
                        ],
                        'columns' => [
                            'link_label' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_hero.link_label',
                            ],
                        ],
                    ],
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_hero',
            ],
            'tx_kumanokodo_items2' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'label, value',
                            ],
                        ],
                    ],
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items2.kumano_hero',
            ],
        ],
    ],
);
