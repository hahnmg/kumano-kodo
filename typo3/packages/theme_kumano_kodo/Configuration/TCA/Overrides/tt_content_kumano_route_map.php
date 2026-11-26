<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'theme_kumano_kodo.journal_fields:tt_content.CType.kumano_route_map',
        'description' => 'theme_kumano_kodo.journal_fields:tt_content.CType.kumano_route_map.description',
        'value' => 'kumano_route_map',
        'icon' => 'kumano-route-map',
        'group' => 'kumano_journal',
    ],
    '--palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, bodytext, --div--;theme_kumano_kodo.journal_fields:tabs.map, tx_themekumanokodo_path, tx_themekumanokodo_stations, tx_themekumanokodo_day_marks, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
                'description' => 'theme_kumano_kodo.journal_fields:tt_content.bodytext.description.map',
            ],
        ],
    ],
);
