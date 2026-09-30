<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_slider',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_slider.description',
        'value' => 'kumano_slider',
        'icon' => 'content-carousel-image',
        'group' => 'kumano_kodo',
    ],
    'subheader, header, tx_kumanokodo_items, --div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section',
    [
        'columnsOverrides' => [
            'subheader' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.subheader.eyebrow',
            ],
            'header' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.header.section',
            ],
            'tx_kumanokodo_items' => [
                'config' => [
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'image, --linebreak--, label, meta, --linebreak--, title, text',
                            ],
                        ],
                        'columns' => [
                            'label' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_slider.label',
                            ],
                            'meta' => [
                                'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.kumano_slider.meta',
                            ],
                        ],
                    ],
                    'minitems' => 1,
                ],
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items.kumano_slider',
            ],
        ],
    ],
);
