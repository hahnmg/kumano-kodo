<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station',
        'label' => 'name',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'hideTable' => true,
        'sortby' => 'sorting_foreign',
        'delete' => 'deleted',
        'languageField' => 'sys_language_uid',
        'transOrigPointerField' => 'l10n_parent',
        'transOrigDiffSourceField' => 'l10n_diffsource',
        'translationSource' => 'l10n_source',
        'enablecolumns' => [
            'disabled' => 'hidden',
        ],
        'typeicon_classes' => [
            'default' => 'kumano-station',
        ],
        'security' => [
            'ignoreWebMountRestriction' => true,
            'ignoreRootLevelRestriction' => true,
            'ignorePageTypeRestriction' => true,
        ],
    ],
    'columns' => [
        'fieldname' => [
            'config' => [
                'type' => 'input',
            ],
        ],
        'name' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.name',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'x' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.x',
            'config' => [
                'type' => 'number',
                'range' => [
                    'lower' => 0,
                    'upper' => 1000,
                ],
            ],
        ],
        'y' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.y',
            'config' => [
                'type' => 'number',
                'range' => [
                    'lower' => 0,
                    'upper' => 250,
                ],
            ],
        ],
        'label_y' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.label_y',
            'config' => [
                'type' => 'number',
                'range' => [
                    'lower' => 0,
                    'upper' => 250,
                ],
            ],
        ],
        'anchor' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.anchor',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.anchor.middle',
                        'value' => 'middle',
                    ],
                    [
                        'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.anchor.start',
                        'value' => 'start',
                    ],
                    [
                        'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.anchor.end',
                        'value' => 'end',
                    ],
                ],
                'default' => 'middle',
            ],
        ],
        'boundary' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.boundary',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
        ],
        'highlight' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.highlight',
            'description' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.highlight.description',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
        ],
        'link' => [
            'label' => 'kumano_kodo_demo.backend_fields:tx_kumanokodo_station.link',
            'config' => [
                'type' => 'link',
                'size' => 40,
                'allowedTypes' => ['page', 'url', 'record'],
            ],
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'name, link, --palette--;;position, --palette--;;label, boundary, highlight',
        ],
    ],
    'palettes' => [
        'position' => [
            'showitem' => 'x, y',
        ],
        'label' => [
            'showitem' => 'label_y, anchor',
        ],
    ],
];
