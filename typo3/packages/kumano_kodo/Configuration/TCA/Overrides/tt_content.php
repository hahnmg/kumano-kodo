<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTcaSelectItemGroup(
    'tt_content',
    'CType',
    'kumano_kodo',
    'kumano_kodo.backend_fields:tt_content.group.kumano_kodo',
    'after:default'
);

ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_kumanokodo_links' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_links',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_link',
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
        ],
    ],
    'tx_kumanokodo_tone' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_tone',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_tone.paper',
                    'value' => 'paper',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_tone.sunk',
                    'value' => 'sunk',
                ],
            ],
            'default' => 'paper',
        ],
    ],
    'tx_kumanokodo_space' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_space',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_space.default',
                    'value' => 'default',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_space.large',
                    'value' => 'large',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_space.flush-top',
                    'value' => 'flush-top',
                ],
                [
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_space.none',
                    'value' => 'none',
                ],
            ],
            'default' => 'default',
        ],
    ],
    'tx_kumanokodo_bleed' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_bleed',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
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
    'tx_kumanokodo_aside' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_aside',
        'config' => [
            'type' => 'text',
            'rows' => 2,
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
    'tx_kumanokodo_items' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_item',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_items',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
        ],
    ],
    'tx_kumanokodo_items2' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_items2',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_item',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_kumanokodo_items2',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
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
            'size' => 30,
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
            'size' => 30,
            'max' => 255,
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
            ],
            'default' => '3',
        ],
    ],
    'tx_kumanokodo_variant' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_variant',
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
    'tx_kumanokodo_meta' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_meta',
        'config' => [
            'type' => 'input',
            'size' => 50,
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
            'size' => 30,
        ],
    ],
    'tx_kumanokodo_legend_end' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_legend_end',
        'config' => [
            'type' => 'input',
            'size' => 30,
        ],
    ],
    'tx_kumanokodo_legend_boundary' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_legend_boundary',
        'config' => [
            'type' => 'input',
            'size' => 30,
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
                    'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_layout.stack',
                    'value' => 'stack',
                ],
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
            'default' => 'stack',
        ],
    ],
    'tx_kumanokodo_align' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_align',
        'displayCond' => 'FIELD:tx_kumanokodo_layout:!=:stack',
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
    'tx_kumanokodo_column_a' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_a',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tt_content',
            'foreign_field' => 'tx_kumanokodo_parent',
            'foreign_match_fields' => [
                'tx_kumanokodo_column' => 'a',
            ],
            'foreign_sortby' => 'sorting',
            'appearance' => [
                'useSortable' => true,
                'collapseAll' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
                'levelLinksPosition' => 'both',
            ],
        ],
    ],
    'tx_kumanokodo_column_b' => [
        'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_column_b',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tt_content',
            'foreign_field' => 'tx_kumanokodo_parent',
            'foreign_match_fields' => [
                'tx_kumanokodo_column' => 'b',
            ],
            'foreign_sortby' => 'sorting',
            'appearance' => [
                'useSortable' => true,
                'collapseAll' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
                'levelLinksPosition' => 'both',
            ],
        ],
        'displayCond' => 'FIELD:tx_kumanokodo_layout:!=:stack',
    ],
    'tx_kumanokodo_parent' => [
        'config' => [
            'type' => 'number',
            'default' => 0,
        ],
    ],
    'tx_kumanokodo_column' => [
        'config' => [
            'type' => 'input',
            'size' => 5,
        ],
    ],
]);

$GLOBALS['TCA']['tt_content']['palettes']['kumanokodo_section'] = [
    'label' => 'kumano_kodo.backend_fields:tt_content.palettes.section',
    'showitem' => 'tx_kumanokodo_tone, tx_kumanokodo_space, tx_kumanokodo_bleed, --linebreak--, tx_kumanokodo_anchor, tx_kumanokodo_label',
];

// Core text and header render as sections too.
ExtensionManagementUtility::addToAllTCAtypes('tt_content', '--div--;kumano_kodo.backend_fields:tabs.section, --palette--;;kumanokodo_section', 'text,header', 'after:bodytext');
