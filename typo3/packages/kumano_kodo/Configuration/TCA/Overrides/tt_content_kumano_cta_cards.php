<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_cta_cards',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_cta_cards.description',
        'value' => 'kumano_cta_cards',
        'icon' => 'content-menu-card',
        'group' => 'kumano_kodo',
    ],
    'header, subheader, --linebreak--, tx_kumanokodo_aside, tx_kumanokodo_gap, tx_kumanokodo_columns, tx_kumanokodo_items, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.section',
            ],
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'title, text, --linebreak--, link, link_label, variant',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_cta_cards',
            ],
        ],
    ],
);
