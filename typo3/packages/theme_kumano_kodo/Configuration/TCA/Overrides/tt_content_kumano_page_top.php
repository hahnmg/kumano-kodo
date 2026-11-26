<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_page_top',
        'description' => 'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_page_top.description',
        'value' => 'kumano_page_top',
        'icon' => 'kumano-page-top',
        'group' => 'kumano_text',
    ],
    'tx_themekumanokodo_variant, --palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_eyebrow, bodytext, tx_themekumanokodo_meta, tx_themekumanokodo_facts, tx_themekumanokodo_links, --div--;core.form.tabs:images, image, tx_themekumanokodo_entries, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_themekumanokodo_variant' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.kumano_page_top.variant',
                'config' => [
                    'items' => [
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.hero',
                            'value' => 'hero',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.text',
                            'value' => 'text',
                        ],
                        [
                            'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_variant.opener',
                            'value' => 'opener',
                        ],
                    ],
                    'default' => 'hero',
                ],
            ],
            'header' => [
                'config' => [
                    'type' => 'text',
                    'rows' => 2,
                    'required' => true,
                ],
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.header.description.lines',
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
            ],
            'image' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:hero',
                'config' => [
                    'maxitems' => 1,
                ],
            ],
            'tx_themekumanokodo_meta' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:opener',
            ],
            'tx_themekumanokodo_facts' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:hero',
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_facts.description.hero',
            ],
            // Further slides turn the photo hero into a slideshow; the element itself stays the first slide.
            'tx_themekumanokodo_entries' => [
                'label' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_entries.slides',
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_entries.slides.description',
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:hero',
                'config' => [
                    'minitems' => 0,
                    'maxitems' => 4,
                    'overrideChildTca' => [
                        'types' => [
                            '0' => [
                                'showitem' => 'image, meta, title, text, --palette--;;slide_link',
                            ],
                        ],
                        'palettes' => [
                            'slide_link' => [
                                'showitem' => 'link, link_label',
                            ],
                        ],
                    ],
                ],
            ],
            'tx_themekumanokodo_links' => [
                'displayCond' => 'FIELD:tx_themekumanokodo_variant:IN:hero,text',
                'description' => 'theme_kumano_kodo.backend_fields:tt_content.tx_themekumanokodo_links.description.buttons',
            ],
        ],
    ],
);
