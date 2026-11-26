<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact',
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
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.clock',
                        'value' => 'clock',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.phone',
                        'value' => 'phone',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.mail',
                        'value' => 'mail',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.map-pin',
                        'value' => 'map-pin',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.home',
                        'value' => 'home',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.file',
                        'value' => 'file',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.search',
                        'value' => 'search',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.chevron-down',
                        'value' => 'chevron-down',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.alert',
                        'value' => 'alert',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.arrow-right',
                        'value' => 'arrow-right',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.sun',
                        'value' => 'sun',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.close',
                        'value' => 'close',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.download',
                        'value' => 'download',
                    ],
                ],
                'default' => 'clock',
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.icon.description',
        ],
        'label' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'value' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.value',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'note' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.note',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_fact.note.description',
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
