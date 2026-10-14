<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_layout', 'kumano_kodo.backend_fields:tt_content.group.kumano_layout', 'after:default');
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_text', 'kumano_kodo.backend_fields:tt_content.group.kumano_text', 'after:default');
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_lists', 'kumano_kodo.backend_fields:tt_content.group.kumano_lists', 'after:default');

ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_kumanokodo_variant' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant',
        'onChange' => 'reload',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant.default',
                    'value' => 'default',
                ],
            ],
            'default' => 'default',
        ],
    ],
    'tx_kumanokodo_columns' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns.2',
                    'value' => '2',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns.3',
                    'value' => '3',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns.4',
                    'value' => '4',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_columns.slider',
                    'value' => 'slider',
                ],
            ],
            'default' => '3',
        ],
    ],
    'tx_kumanokodo_aside' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_aside',
        'config' => [
            'type' => 'text',
            'rows' => 2,
        ],
    ],
    'tx_kumanokodo_anchor' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_anchor',
        'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_anchor.description',
        'config' => [
            'type' => 'input',
            'size' => 20,
            'max' => 60,
            'eval' => 'alphanum_x,nospace,lower',
        ],
    ],
    'tx_kumanokodo_meta' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_meta',
        'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_meta.description',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_layout' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout',
        'onChange' => 'reload',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.even',
                    'value' => 'even',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.content-sidebar',
                    'value' => 'content-sidebar',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.text-media',
                    'value' => 'text-media',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.heading-content',
                    'value' => 'heading-content',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.wide-narrow',
                    'value' => 'wide-narrow',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.narrow-wide',
                    'value' => 'narrow-wide',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.hero',
                    'value' => 'hero',
                ],
            ],
            'default' => 'even',
        ],
    ],
    'tx_kumanokodo_edge' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_edge',
        'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_edge.description',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ],
    ],
    'tx_kumanokodo_colour' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_colour',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_colour.none',
                    'value' => '',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_colour.first',
                    'value' => 'first',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_colour.second',
                    'value' => 'second',
                ],
            ],
            'default' => '',
        ],
    ],
    'tx_kumanokodo_align' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_align',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_align.start',
                    'value' => 'start',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_align.center',
                    'value' => 'center',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_align.end',
                    'value' => 'end',
                ],
            ],
            'default' => 'start',
        ],
    ],
    'tx_kumanokodo_entries' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_entries',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_entry',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_entries',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
            'minitems' => 1,
        ],
    ],
    'tx_kumanokodo_links' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_links',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_entry',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_links',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
            'overrideChildTca' => [
                'types' => [
                    '0' => [
                        'showitem' => '--palette--;;link_text, direction',
                    ],
                ],
                'palettes' => [
                    'link_text' => [
                        'showitem' => 'title, link',
                    ],
                ],
            ],
        ],
    ],
    'tx_kumanokodo_facts' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_facts',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_fact',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_facts',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
        ],
    ],
    'tx_kumanokodo_questions' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_questions',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_question',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_questions',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
            'minitems' => 1,
        ],
    ],
]);

// The core palette stays for the core header and text elements.
ExtensionManagementUtility::addFieldsToPalette('tt_content', 'headers', '--linebreak--, tx_kumanokodo_aside', 'after:subheader');
$GLOBALS['TCA']['tt_content']['palettes']['kumanoHeading_full'] = ['showitem' => 'subheader, --linebreak--, header, header_layout, --linebreak--, tx_kumanokodo_aside'];
$GLOBALS['TCA']['tt_content']['palettes']['kumanoHeading_eyebrow'] = ['showitem' => 'subheader, --linebreak--, header, header_layout'];
$GLOBALS['TCA']['tt_content']['palettes']['kumanoHeading_plain'] = ['showitem' => 'header, header_layout'];
ExtensionManagementUtility::addFieldsToPalette('tt_content', 'frames', '--linebreak--, tx_kumanokodo_anchor', 'after:space_after_class');
