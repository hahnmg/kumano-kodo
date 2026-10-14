<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'tx_kumanokodo_span' => [
        'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.2',
                    'value' => '2',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.3',
                    'value' => '3',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.4',
                    'value' => '4',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.5',
                    'value' => '5',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.6',
                    'value' => '6',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.7',
                    'value' => '7',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.8',
                    'value' => '8',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.9',
                    'value' => '9',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.10',
                    'value' => '10',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.11',
                    'value' => '11',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_span.12',
                    'value' => '12',
                ],
            ],
            'default' => '6',
        ],
    ],
    'tx_kumanokodo_shift' => [
        'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_shift',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_shift.0',
                    'value' => '0',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_shift.1',
                    'value' => '1',
                ],
                [
                    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.tx_kumanokodo_shift.2',
                    'value' => '2',
                ],
            ],
            'default' => '0',
        ],
    ],
]);

$GLOBALS['TCA']['sys_file_reference']['palettes']['kumanokodo_chapter_photo'] = [
    'label' => 'kumano_kodo_demo.backend_fields:sys_file_reference.palettes.chapter',
    'showitem' => 'tx_kumanokodo_span, tx_kumanokodo_shift',
];
