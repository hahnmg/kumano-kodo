<?php

return [
    'ctrl' => [
        'title' => 'kumano_kodo.backend_fields:tx_kumanokodo_link',
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
        'typeicon_classes' => ['default' => 'kumano-link'],
        'security' => [
            'ignoreWebMountRestriction' => true,
            'ignoreRootLevelRestriction' => true,
            'ignorePageTypeRestriction' => true,
        ],
    ],
    'columns' => [
        // Written by the inline relation; input rather than passthrough so the column is derived.
        'fieldname' => [
            'config' => [
                'type' => 'input',
            ],
        ],
        'label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_link.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'link' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_link.link',
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_link.link.description',
            'config' => [
                'type' => 'link',
                'size' => 40,
            ],
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'label, link',
        ],
    ],
];
