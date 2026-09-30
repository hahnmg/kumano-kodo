<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addRecordType(
    [
        'label' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_route_map',
        'description' => 'kumano_kodo.backend_fields:tt_content.CType.kumano_route_map.description',
        'value' => 'kumano_route_map',
        'icon' => 'content-special-html',
        'group' => 'kumano_journal',
    ],
    '--palette--;;headers, tx_kumanokodo_meta, tx_kumanokodo_path, --linebreak--, tx_kumanokodo_legend_walked, tx_kumanokodo_legend_end, tx_kumanokodo_legend_boundary, tx_kumanokodo_stations, tx_kumanokodo_day_marks, --div--;core.form.tabs:appearance, --palette--;;frames',
    [
        'columnsOverrides' => [
            'tx_kumanokodo_meta' => [
                'label' => 'kumano_kodo.backend_fields:tt_content.tx_kumanokodo_meta.maplabel',
            ],
        ],
    ],
);
