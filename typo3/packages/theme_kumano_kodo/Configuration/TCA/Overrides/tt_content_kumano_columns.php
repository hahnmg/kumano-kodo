<?php

declare(strict_types=1);

use B13\Container\Tca\ContainerConfiguration;
use B13\Container\Tca\Registry;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3') or die();

GeneralUtility::makeInstance(Registry::class)->configureContainer(
    (new ContainerConfiguration(
        'kumano_columns',
        'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_columns',
        'theme_kumano_kodo.backend_fields:tt_content.CType.kumano_columns.description',
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
        ->setIcon('EXT:theme_kumano_kodo/Resources/Public/Icons/Content/kumano-columns.svg')
        ->setGroup('kumano_layout')
);

$GLOBALS['TCA']['tt_content']['types']['kumano_columns']['showitem'] = 'tx_themekumanokodo_layout, tx_themekumanokodo_colour, --palette--;theme_kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, --div--;core.form.tabs:appearance, --palette--;;frames, tx_themekumanokodo_align';
