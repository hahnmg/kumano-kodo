<?php

declare(strict_types=1);

return [
    'ctrl' => [
        'title' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_question',
        'label' => 'question',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'hideTable' => true,
        'sortby' => 'sorting_foreign',
        'delete' => 'deleted',
        'versioningWS' => true,
        'languageField' => 'sys_language_uid',
        'transOrigPointerField' => 'l10n_parent',
        'transOrigDiffSourceField' => 'l10n_diffsource',
        'translationSource' => 'l10n_source',
        'enablecolumns' => [
            'disabled' => 'hidden',
        ],
        'typeicon_classes' => [
            'default' => 'kumano-question',
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
        'question' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_question.question',
            'config' => [
                'type' => 'input',
                'size' => 40,
                'max' => 255,
                'required' => true,
            ],
        ],
        'answer' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_question.answer',
            'config' => [
                'type' => 'text',
                'rows' => 5,
                'required' => true,
            ],
        ],
        'open' => [
            'label' => 'theme_kumano_kodo.backend_fields:tx_themekumanokodo_question.open',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
            ],
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'question, answer, open',
        ],
    ],
];
