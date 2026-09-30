<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item',
        'label' => 'title',
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
            'default' => 'content-bullets',
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
        'image' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.image',
            'config' => [
                'type' => 'file',
                'allowed' => [
                    'common-image-types',
                ],
                'maxitems' => 1,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.image.description',
        ],
        'label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.label.description',
        ],
        'title' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.title',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.title.description',
        ],
        'text' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.text',
            'config' => [
                'type' => 'text',
                'rows' => 3,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.text.description',
        ],
        'meta' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.meta',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.meta.description',
        ],
        'link' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.link',
            'config' => [
                'type' => 'link',
                'size' => 40,
            ],
        ],
        'direction' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.direction',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.direction.forward',
                        'value' => 'forward',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.direction.back',
                        'value' => 'back',
                    ],
                ],
                'default' => 'forward',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.direction.description',
        ],
        'active' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_list_item.active',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'image, --linebreak--, label, title, --linebreak--, text, meta, --linebreak--, link, direction, active',
        ],
    ],
];
