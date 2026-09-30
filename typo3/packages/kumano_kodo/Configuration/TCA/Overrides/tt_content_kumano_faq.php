<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_faq',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_faq.description',
        'value' => 'kumano_faq',
        'icon' => 'content-bullets',
        'group' => 'kumano_kodo',
    ],
    'subheader, header, bodytext, tx_kumanokodo_items, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.section',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'bodytext' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.bodytext.intro',
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
                                'showitem' => 'title, text, open',
                            ],
                        ],
                        'columns' => [
                            'title' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_faq.title',
                            ],
                            'text' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_faq.text',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_faq',
            ],
        ],
    ],
);
