<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_hero_split',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_hero_split.description',
        'value' => 'kumano_hero_split',
        'icon' => 'content-header',
        'group' => 'kumano_kodo',
    ],
    'header, bodytext, --linebreak--, tx_kumanokodo_link, tx_kumanokodo_link_label, --linebreak--, subheader, tx_kumanokodo_items, --linebreak--, tx_kumanokodo_link2, tx_kumanokodo_link2_label',
    [
        'columnsOverrides' => [
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
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.listtitle',
            ],
            'tx_kumanokodo_link' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_link.button',
            ],
            'tx_kumanokodo_link2' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_link2.more',
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'image, title, meta, link',
                            ],
                        ],
                        'columns' => [
                            'title' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_hero_split.title',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_hero_split',
            ],
        ],
    ],
);
