<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTCAcolumns('sys_file_reference', [
    'tx_themekumanokodo_span' => [
        'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.2',
                    'value' => '2',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.3',
                    'value' => '3',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.4',
                    'value' => '4',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.5',
                    'value' => '5',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.6',
                    'value' => '6',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.7',
                    'value' => '7',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.8',
                    'value' => '8',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.9',
                    'value' => '9',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.10',
                    'value' => '10',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.11',
                    'value' => '11',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_span.12',
                    'value' => '12',
                ],
            ],
            'default' => '6',
        ],
    ],
    'tx_themekumanokodo_shift' => [
        'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_shift',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_shift.0',
                    'value' => '0',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_shift.1',
                    'value' => '1',
                ],
                [
                    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.tx_themekumanokodo_shift.2',
                    'value' => '2',
                ],
            ],
            'default' => '0',
        ],
    ],
]);

$GLOBALS['TCA']['sys_file_reference']['palettes']['kumanokodo_chapter_photo'] = [
    'label' => 'theme_kumano_kodo.journal_fields:sys_file_reference.palettes.chapter',
    'showitem' => 'tx_themekumanokodo_span, tx_themekumanokodo_shift',
];
