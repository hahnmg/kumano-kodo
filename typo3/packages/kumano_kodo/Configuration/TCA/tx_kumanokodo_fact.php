<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact',
        'label' => 'label',
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
            'default' => 'kumano-fact',
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
        'icon' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.clock',
                        'value' => 'clock',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.phone',
                        'value' => 'phone',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.mail',
                        'value' => 'mail',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.map-pin',
                        'value' => 'map-pin',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.home',
                        'value' => 'home',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.file',
                        'value' => 'file',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.search',
                        'value' => 'search',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.chevron-down',
                        'value' => 'chevron-down',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.alert',
                        'value' => 'alert',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.arrow-right',
                        'value' => 'arrow-right',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.sun',
                        'value' => 'sun',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.close',
                        'value' => 'close',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.download',
                        'value' => 'download',
                    ],
                ],
                'default' => 'clock',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.icon.description',
        ],
        'label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'value' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.value',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'note' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.note',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_fact.note.description',
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'icon, --palette--;;value, note',
        ],
    ],
    'palettes' => [
        'value' => [
            'showitem' => 'label, value',
        ],
    ],
];
