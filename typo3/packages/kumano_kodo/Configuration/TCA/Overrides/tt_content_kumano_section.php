<?php

declare(strict_types=1);

use B13\Container\Tca\ContainerConfiguration;
use B13\Container\Tca\Registry;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3') or die();

GeneralUtility::makeInstance(Registry::class)->configureContainer(
    (new ContainerConfiguration(
        'kumano_section',
        'kumano_kodo.backend_fields:tt_content.CType.kumano_section',
        'kumano_kodo.backend_fields:tt_content.CType.kumano_section.description',
        [
            [
                [
                    'name' => 'Content',
                    'colPos' => 201,
                ],
            ],
        ]
    ))
        ->setIcon('container-1col')
        ->setGroup('kumano_layout')
);

$GLOBALS['TCA']['tt_content']['types']['kumano_section']['showitem'] = '--palette--;kumano_kodo.backend_fields:palettes.heading;kumanoHeading_full, --div--;core.form.tabs:appearance, --palette--;;frames';
