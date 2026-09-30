<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_layout', 'kumano_kodo.backend_fields:tt_content.group.kumano_layout', 'after:default');
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_text', 'kumano_kodo.backend_fields:tt_content.group.kumano_text', 'after:default');
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_lists', 'kumano_kodo.backend_fields:tt_content.group.kumano_lists', 'after:default');
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_journal', 'kumano_kodo.backend_fields:tt_content.group.kumano_journal', 'after:default');

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
    'tx_kumanokodo_gap' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_gap',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_gap.16',
                    'value' => '16',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_gap.24',
                    'value' => '24',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_gap.40',
                    'value' => '40',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_gap.56',
                    'value' => '56',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_gap.64',
                    'value' => '64',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_gap.96',
                    'value' => '96',
                ],
            ],
            'default' => '40',
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
    'tx_kumanokodo_label' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_label',
        'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_label.description',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_heading' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_heading',
        'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_heading.description',
        'config' => [
            'type' => 'text',
            'rows' => 2,
            'required' => true,
        ],
    ],
    'tx_kumanokodo_link' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_link',
        'config' => [
            'type' => 'link',
            'size' => 40,
        ],
    ],
    'tx_kumanokodo_link_label' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_link_label',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_link2' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_link2',
        'config' => [
            'type' => 'link',
            'size' => 40,
        ],
    ],
    'tx_kumanokodo_link2_label' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_link2_label',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_meta' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_meta',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_vertical' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_vertical',
        'description' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_vertical.description',
        'config' => [
            'type' => 'input',
            'size' => 20,
            'max' => 40,
        ],
    ],
    'tx_kumanokodo_number' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_number',
        'config' => [
            'type' => 'input',
            'size' => 5,
            'max' => 5,
        ],
    ],
    'tx_kumanokodo_rule' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_rule',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 1,
        ],
    ],
    'tx_kumanokodo_path' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_path',
        'config' => [
            'type' => 'text',
            'rows' => 3,
            'required' => true,
        ],
    ],
    'tx_kumanokodo_legend_walked' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_legend_walked',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_legend_end' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_legend_end',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_legend_boundary' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_legend_boundary',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_layout' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout',
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
            ],
            'default' => 'even',
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
    'tx_kumanokodo_column_gap' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_gap',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_gap.16',
                    'value' => '16',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_gap.24',
                    'value' => '24',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_gap.40',
                    'value' => '40',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_gap.56',
                    'value' => '56',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_gap.64',
                    'value' => '64',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_gap.96',
                    'value' => '96',
                ],
            ],
            'default' => '40',
        ],
    ],
    'tx_kumanokodo_cards' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_cards',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_card',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_cards',
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
    'tx_kumanokodo_list_items' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_list_items',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_list_item',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_list_items',
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
    'tx_kumanokodo_stations' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_stations',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_station',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_stations',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
            'minitems' => 2,
        ],
    ],
    'tx_kumanokodo_day_marks' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_day_marks',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_day_mark',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_day_marks',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
        ],
    ],
]);

// The heading palette carries the text beside it and the space below it; the frame palette the anchor.
ExtensionManagementUtility::addFieldsToPalette('tt_content', 'headers', '--linebreak--, tx_kumanokodo_aside, tx_kumanokodo_gap', 'after:subheader');
ExtensionManagementUtility::addFieldsToPalette('tt_content', 'frames', '--linebreak--, tx_kumanokodo_anchor, tx_kumanokodo_label', 'after:space_after_class');
