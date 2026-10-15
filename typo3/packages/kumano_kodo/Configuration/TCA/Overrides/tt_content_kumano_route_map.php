<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.journal_fields:tt_content.CType.kumano_route_map',
        'description' => 'kumano_kodo.journal_fields:tt_content.CType.kumano_route_map.description',
        'value' => 'kumano_route_map',
        'icon' => 'kumano-route-map',
        'group' => 'kumano_journal',
    ],
    '--palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, bodytext, --div--;kumano_kodo.journal_fields:tabs.map, tx_kumanokodo_path, tx_kumanokodo_stations, tx_kumanokodo_day_marks, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'bodytext' => [
                'config' => [
                    'enableRichtext' => true,
                    'richtextConfiguration' => 'minimal',
                ],
                'description' => 'kumano_kodo.journal_fields:tt_content.bodytext.description.map',
            ],
        ],
    ],
);
