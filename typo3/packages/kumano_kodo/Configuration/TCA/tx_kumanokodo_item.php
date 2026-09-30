<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'kumano_kodo.backend_fields:tx_kumanokodo_item',
        'label' => 'title',
        'label_alt' => 'label,value,meta',
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
        'title' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.title',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
        ],
        'subtitle' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.subtitle',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
        ],
        'text' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.text',
            'config' => [
                'type' => 'text',
                'rows' => 4,
            ],
        ],
        'label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.label',
            'config' => [
                'type' => 'input',
                'size' => 30,
                'max' => 255,
            ],
        ],
        'value' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.value',
            'config' => [
                'type' => 'input',
                'size' => 30,
                'max' => 255,
            ],
        ],
        'meta' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.meta',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
        ],
        'badge' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.badge',
            'config' => [
                'type' => 'input',
                'size' => 20,
                'max' => 60,
            ],
        ],
        'note' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.note',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
        ],
        'icon' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.clock',
                        'value' => 'clock',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.phone',
                        'value' => 'phone',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.mail',
                        'value' => 'mail',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.map-pin',
                        'value' => 'map-pin',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.home',
                        'value' => 'home',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.file',
                        'value' => 'file',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.search',
                        'value' => 'search',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.chevron-down',
                        'value' => 'chevron-down',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.alert',
                        'value' => 'alert',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.arrow-right',
                        'value' => 'arrow-right',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.sun',
                        'value' => 'sun',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.close',
                        'value' => 'close',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.icon.download',
                        'value' => 'download',
                    ],
                ],
                'default' => 'clock',
            ],
        ],
        'link' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.link',
            'config' => [
                'type' => 'link',
                'size' => 40,
            ],
        ],
        'link_label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.link_label',
            'config' => [
                'type' => 'input',
                'size' => 30,
                'max' => 255,
            ],
        ],
        'image' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.image',
            'config' => [
                'type' => 'file',
                'allowed' => [
                    'common-image-types',
                ],
                'maxitems' => 1,
            ],
        ],
        'span' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.2',
                        'value' => '2',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.3',
                        'value' => '3',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.4',
                        'value' => '4',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.5',
                        'value' => '5',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.6',
                        'value' => '6',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.7',
                        'value' => '7',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.8',
                        'value' => '8',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.9',
                        'value' => '9',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.10',
                        'value' => '10',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.11',
                        'value' => '11',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.span.12',
                        'value' => '12',
                    ],
                ],
                'default' => '6',
            ],
        ],
        'shift' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.shift',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.shift.0',
                        'value' => '0',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.shift.1',
                        'value' => '1',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.shift.2',
                        'value' => '2',
                    ],
                ],
                'default' => '0',
            ],
        ],
        'x' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.x',
            'config' => [
                'type' => 'number',
                'range' => [
                    'lower' => 0,
                    'upper' => 1000,
                ],
            ],
        ],
        'y' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.y',
            'config' => [
                'type' => 'number',
                'range' => [
                    'lower' => 0,
                    'upper' => 250,
                ],
            ],
        ],
        'label_y' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.label_y',
            'config' => [
                'type' => 'number',
                'range' => [
                    'lower' => 0,
                    'upper' => 250,
                ],
            ],
        ],
        'anchor' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.anchor',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.anchor.middle',
                        'value' => 'middle',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.anchor.start',
                        'value' => 'start',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.anchor.end',
                        'value' => 'end',
                    ],
                ],
                'default' => 'middle',
            ],
        ],
        'boundary' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.boundary',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
        ],
        'open' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.open',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
        ],
        'direction' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.direction',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.direction.forward',
                        'value' => 'forward',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.direction.back',
                        'value' => 'back',
                    ],
                ],
                'default' => 'forward',
            ],
        ],
        'active' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.active',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
        ],
        'variant' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.variant',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.variant.default',
                        'value' => 'default',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_item.variant.featured',
                        'value' => 'featured',
                    ],
                ],
                'default' => 'default',
            ],
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'title, subtitle, text, label, value, meta, badge, note, icon, link, link_label, image, span, shift, x, y, label_y, anchor, boundary, open, direction, active, variant',
        ],
    ],
];
