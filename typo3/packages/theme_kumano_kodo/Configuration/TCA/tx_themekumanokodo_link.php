<?php

return [
    'ctrl' => [
        'title' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_link',
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
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_link.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'link' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_link.link',
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_link.link.description',
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
