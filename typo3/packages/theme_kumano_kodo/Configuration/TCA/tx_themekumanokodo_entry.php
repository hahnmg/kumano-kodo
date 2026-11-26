<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry',
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
            'default' => 'kumano-entry',
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
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.image',
            'config' => [
                'type' => 'file',
                'allowed' => [
                    'common-image-types',
                ],
                'maxitems' => 1,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.image.description',
        ],
        'icon' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.clock',
                        'value' => 'clock',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.phone',
                        'value' => 'phone',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.mail',
                        'value' => 'mail',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.map-pin',
                        'value' => 'map-pin',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.home',
                        'value' => 'home',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.file',
                        'value' => 'file',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.search',
                        'value' => 'search',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.chevron-down',
                        'value' => 'chevron-down',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.alert',
                        'value' => 'alert',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.arrow-right',
                        'value' => 'arrow-right',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.sun',
                        'value' => 'sun',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.close',
                        'value' => 'close',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.download',
                        'value' => 'download',
                    ],
                ],
                'default' => 'clock',
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.icon.description',
        ],
        'label' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.label.description',
        ],
        'title' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.title',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.title.description',
        ],
        'text' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.text',
            'config' => [
                'type' => 'text',
                'rows' => 3,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.text.description',
        ],
        'meta' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.meta',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.meta.description',
        ],
        'badge' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.badge',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 60,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.badge.description',
        ],
        'link' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.link',
            'config' => [
                'type' => 'link',
                'size' => 40,
            ],
        ],
        'link_label' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.link_label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.link_label.description',
        ],
        'emphasis' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.emphasis',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.emphasis.default',
                        'value' => 'default',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.emphasis.featured',
                        'value' => 'featured',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.emphasis.ruled',
                        'value' => 'ruled',
                    ],
                ],
                'default' => 'default',
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.emphasis.description',
        ],
        'direction' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.direction',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.direction.forward',
                        'value' => 'forward',
                    ],
                    [
                        'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.direction.back',
                        'value' => 'back',
                    ],
                ],
                'default' => 'forward',
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.direction.description',
        ],
        'active' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.active',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
            'description' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_entry.active.description',
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
