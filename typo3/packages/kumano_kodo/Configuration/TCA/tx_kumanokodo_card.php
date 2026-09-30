<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'kumano_kodo.backend_fields:tx_kumanokodo_card',
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
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.image',
            'config' => [
                'type' => 'file',
                'allowed' => [
                    'common-image-types',
                ],
                'maxitems' => 1,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.image.description',
        ],
        'icon' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.clock',
                        'value' => 'clock',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.phone',
                        'value' => 'phone',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.mail',
                        'value' => 'mail',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.map-pin',
                        'value' => 'map-pin',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.home',
                        'value' => 'home',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.file',
                        'value' => 'file',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.search',
                        'value' => 'search',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.chevron-down',
                        'value' => 'chevron-down',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.alert',
                        'value' => 'alert',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.arrow-right',
                        'value' => 'arrow-right',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.sun',
                        'value' => 'sun',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.close',
                        'value' => 'close',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.download',
                        'value' => 'download',
                    ],
                ],
                'default' => 'clock',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.icon.description',
        ],
        'label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.label.description',
        ],
        'title' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.title',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'text' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.text',
            'config' => [
                'type' => 'text',
                'rows' => 3,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.text.description',
        ],
        'meta' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.meta',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.meta.description',
        ],
        'badge' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.badge',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 60,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.badge.description',
        ],
        'link' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.link',
            'config' => [
                'type' => 'link',
                'size' => 40,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.link.description',
        ],
        'link_label' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.link_label',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.link_label.description',
        ],
        'emphasis' => [
            'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.emphasis',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.emphasis.default',
                        'value' => 'default',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.emphasis.featured',
                        'value' => 'featured',
                    ],
                    [
                        'label' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.emphasis.ruled',
                        'value' => 'ruled',
                    ],
                ],
                'default' => 'default',
            ],
            'description' => 'kumano_kodo.backend_fields:tx_kumanokodo_card.emphasis.description',
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'image, icon, --linebreak--, label, title, --linebreak--, text, --linebreak--, meta, badge, --linebreak--, link, link_label, emphasis',
        ],
    ],
];
