<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'kumano_kodo.backend_fields:tx_kumanokodo_day_mark',
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
            'default' => 'content-special-html',
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
        'label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_day_mark.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'x' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_day_mark.x',
            'config' => [
                'type' => 'number',
                'range' => [
                    'lower' => 0,
                    'upper' => 1000,
                ],
            ],
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => '--palette--;;mark',
        ],
    ],
    'palettes' => [
        'mark' => [
            'showitem' => 'label, x',
        ],
    ],
];
