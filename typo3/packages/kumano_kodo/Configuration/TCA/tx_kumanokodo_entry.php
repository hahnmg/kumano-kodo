<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry',
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
            'fe_group' => 'fe_group',
        ],
        'typeicon_classes' => [
            'default' => 'content-card',
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
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.image',
            'config' => [
                'type' => 'file',
                'allowed' => [
                    'common-image-types',
                ],
                'maxitems' => 1,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.image.description',
        ],
        'icon' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.clock',
                        'value' => 'clock',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.phone',
                        'value' => 'phone',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.mail',
                        'value' => 'mail',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.map-pin',
                        'value' => 'map-pin',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.home',
                        'value' => 'home',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.file',
                        'value' => 'file',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.search',
                        'value' => 'search',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.chevron-down',
                        'value' => 'chevron-down',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.alert',
                        'value' => 'alert',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.arrow-right',
                        'value' => 'arrow-right',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.sun',
                        'value' => 'sun',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.close',
                        'value' => 'close',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.download',
                        'value' => 'download',
                    ],
                ],
                'default' => 'clock',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.icon.description',
        ],
        'label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.label.description',
        ],
        'title' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.title',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.title.description',
        ],
        'text' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.text',
            'config' => [
                'type' => 'text',
                'rows' => 3,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.text.description',
        ],
        'meta' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.meta',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.meta.description',
        ],
        'badge' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.badge',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 60,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.badge.description',
        ],
        'link' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.link',
            'config' => [
                'type' => 'link',
                'size' => 40,
            ],
        ],
        'link_label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.link_label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.link_label.description',
        ],
        'emphasis' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.emphasis',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.emphasis.default',
                        'value' => 'default',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.emphasis.featured',
                        'value' => 'featured',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.emphasis.ruled',
                        'value' => 'ruled',
                    ],
                ],
                'default' => 'default',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.emphasis.description',
        ],
        'direction' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.direction',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.direction.forward',
                        'value' => 'forward',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.direction.back',
                        'value' => 'back',
                    ],
                ],
                'default' => 'forward',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.direction.description',
        ],
        'active' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.active',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_entry.active.description',
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => '--palette--;;media, --palette--;;title, text, --palette--;;meta, --palette--;;link, --palette--;;options',
        ],
    ],
    'palettes' => [
        'media' => [
            'showitem' => 'image, --linebreak--, icon',
        ],
        'title' => [
            'showitem' => 'label, title',
        ],
        'meta' => [
            'showitem' => 'meta, badge',
        ],
        'link' => [
            'showitem' => 'link, link_label',
        ],
        'options' => [
            'showitem' => 'emphasis, direction, active',
        ],
    ],
];
