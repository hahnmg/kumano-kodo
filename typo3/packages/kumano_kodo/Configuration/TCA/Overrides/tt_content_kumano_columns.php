<?php

declare(strict_types=1);

use B13\Container\Tca\ContainerConfiguration;
use B13\Container\Tca\Registry;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3') or die();

GeneralUtility::makeInstance(Registry::class)->configureContainer(
    (new ContainerConfiguration(
        'kumano_columns',
        'kumano_kodo.backend_fields:tt_content.CType.kumano_columns',
        'kumano_kodo.backend_fields:tt_content.CType.kumano_columns.description',
        [
            [
                [
                    'name' => 'First column',
                    'colPos' => 201,
                ],
                [
                    'name' => 'Second column',
                    'colPos' => 202,
                ],
            ],
        ]
    ))
        ->setIcon('container-2col')
        ->setGroup('kumano_layout')
);

$GLOBALS['TCA']['tt_content']['types']['kumano_columns']['showitem'] = 'tx_kumanokodo_layout, --palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, --div--;core.form.tabs:appearance, --palette--;;frames, tx_kumanokodo_align';
