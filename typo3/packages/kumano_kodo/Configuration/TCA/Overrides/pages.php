<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTCAcolumns('pages', [
    'tx_kumanokodo_flyout' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout',
        'description' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout.description',
        // The menu opens the same way in every language.
        'l10n_mode' => 'exclude',
        'l10n_display' => 'defaultAsReadonly',
        'onChange' => 'reload',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                ['label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout.none', 'value' => ''],
                ['label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout.dropdown', 'value' => 'dropdown'],
                ['label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout.mega', 'value' => 'mega'],
            ],
            'default' => '',
        ],
    ],
    'tx_kumanokodo_flyout_columns' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_columns',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:REQ:true',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_kumanokodo_nav_column',
            'foreign_field' => 'page',
            'appearance' => [
                'useSortable' => true,
                'expandSingle' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
            ],
        ],
    ],
    'tx_kumanokodo_flyout_text_title' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_text_title',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_flyout_text' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_text',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'text',
            'enableRichtext' => true,
        ],
    ],
    'tx_kumanokodo_flyout_overview' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_overview',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'link',
            'size' => 40,
        ],
    ],
    'tx_kumanokodo_flyout_overview_label' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_overview_label',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_flyout_teaser_image' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_teaser_image',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'file',
            'allowed' => ['common-image-types'],
            'maxitems' => 1,
        ],
    ],
    'tx_kumanokodo_flyout_teaser_title' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_teaser_title',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_flyout_teaser_subtitle' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_teaser_subtitle',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_flyout_teaser_meta' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_teaser_meta',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'input',
            'size' => 40,
            'max' => 255,
        ],
    ],
    'tx_kumanokodo_flyout_teaser_badge' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_teaser_badge',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'input',
            'size' => 20,
            'max' => 60,
        ],
    ],
    'tx_kumanokodo_flyout_teaser_link' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_flyout_teaser_link',
        'displayCond' => 'FIELD:tx_kumanokodo_flyout:=:mega',
        'config' => [
            'type' => 'link',
            'size' => 40,
        ],
    ],
]);

$GLOBALS['TCA']['pages']['palettes']['kumanokodo_flyout_teaser'] = [
    'label' => 'kumano_kodo.backend_fields:pages.palettes.flyout_teaser',
    'showitem' => 'tx_kumanokodo_flyout_teaser_image, --linebreak--, tx_kumanokodo_flyout_teaser_title, tx_kumanokodo_flyout_teaser_subtitle,
        --linebreak--, tx_kumanokodo_flyout_teaser_meta, tx_kumanokodo_flyout_teaser_badge, --linebreak--, tx_kumanokodo_flyout_teaser_link',
];

ExtensionManagementUtility::addToAllTCAtypes(
    'pages',
    '--div--;kumano_kodo.backend_fields:pages.tabs.flyout,
        tx_kumanokodo_flyout, tx_kumanokodo_flyout_columns, tx_kumanokodo_flyout_text_title, tx_kumanokodo_flyout_text,
        tx_kumanokodo_flyout_overview, tx_kumanokodo_flyout_overview_label, --palette--;;kumanokodo_flyout_teaser',
    '1',
    'after:nav_hide'
);
