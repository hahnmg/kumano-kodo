<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_layout', 'theme_kumano_kodo.backend_fields:tt_content.group.kumano_layout', 'after:default');
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_text', 'theme_kumano_kodo.backend_fields:tt_content.group.kumano_text', 'after:default');
ExtensionManagementUtility::addTcaSelectItemGroup('tt_content', 'CType', 'kumano_lists', 'theme_kumano_kodo.backend_fields:tt_content.group.kumano_lists', 'after:default');

ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_themekumanokodo_variant' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant',
        'onChange' => 'reload',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.default',
                    'value' => 'default',
                ],
            ],
            'default' => 'default',
        ],
    ],
    'tx_themekumanokodo_columns' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns.2',
                    'value' => '2',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns.3',
                    'value' => '3',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns.4',
                    'value' => '4',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_columns.slider',
                    'value' => 'slider',
                ],
            ],
            'default' => '3',
        ],
    ],
    'tx_themekumanokodo_aside' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_aside',
        'config' => [
            'type' => 'text',
            'rows' => 2,
        ],
    ],
    'tx_themekumanokodo_anchor' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_anchor',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_anchor.description',
        'config' => [
            'type' => 'input',
            'size' => 20,
            'max' => 60,
            'eval' => 'alphanum_x,nospace,lower',
        ],
    ],
    'tx_themekumanokodo_meta' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_meta',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_meta.description',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_themekumanokodo_layout' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout',
        'onChange' => 'reload',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout.even',
                    'value' => 'even',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout.content-sidebar',
                    'value' => 'content-sidebar',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout.text-media',
                    'value' => 'text-media',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout.heading-content',
                    'value' => 'heading-content',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout.wide-narrow',
                    'value' => 'wide-narrow',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout.narrow-wide',
                    'value' => 'narrow-wide',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_layout.hero',
                    'value' => 'hero',
                ],
            ],
            'default' => 'even',
        ],
    ],
    'tx_themekumanokodo_edge' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_edge',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_edge.description',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'default' => 0,
        ],
    ],
    'tx_themekumanokodo_colour' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_colour',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_colour.none',
                    'value' => '',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_colour.first',
                    'value' => 'first',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_colour.second',
                    'value' => 'second',
                ],
            ],
            'default' => '',
        ],
    ],
    'tx_themekumanokodo_align' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_align',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_align.start',
                    'value' => 'start',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_align.center',
                    'value' => 'center',
                ],
                [
                    'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_align.end',
                    'value' => 'end',
                ],
            ],
            'default' => 'start',
        ],
    ],
    'tx_themekumanokodo_entries' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_entries',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_themekumanokodo_entry',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_themekumanokodo_entries',
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
    'tx_themekumanokodo_links' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_links',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_themekumanokodo_entry',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_themekumanokodo_links',
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
    'tx_themekumanokodo_facts' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_facts',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_themekumanokodo_fact',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_themekumanokodo_facts',
            ],
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
        ],
    ],
    'tx_themekumanokodo_questions' => [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_questions',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_themekumanokodo_question',
            'foreign_field' => 'uid_foreign',
            'foreign_table_field' => 'tablename',
            'foreign_match_fields' => [
                'fieldname' => 'tx_themekumanokodo_questions',
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
ExtensionManagementUtility::addFieldsToPalette('tt_content', 'headers', '--linebreak--, tx_themekumanokodo_aside', 'after:subheader');
$GLOBALS['TCA']['tt_content']['palettes']['kumanoHeading_full'] = ['showitem' => 'subheader, --linebreak--, header, header_layout, --linebreak--, tx_themekumanokodo_aside'];
$GLOBALS['TCA']['tt_content']['palettes']['kumanoHeading_eyebrow'] = ['showitem' => 'subheader, --linebreak--, header, header_layout'];
$GLOBALS['TCA']['tt_content']['palettes']['kumanoHeading_plain'] = ['showitem' => 'header, header_layout'];
ExtensionManagementUtility::addFieldsToPalette('tt_content', 'frames', '--linebreak--, tx_themekumanokodo_anchor', 'after:space_after_class');
