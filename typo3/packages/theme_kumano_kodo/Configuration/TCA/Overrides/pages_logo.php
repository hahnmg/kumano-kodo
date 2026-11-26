<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTCAcolumns('pages', [
    'tx_themekumanokodo_logo' => [
        'label' => 'theme_kumano_kodo.backend_fields:pages.tx_themekumanokodo_logo',
        'description' => 'theme_kumano_kodo.backend_fields:pages.tx_themekumanokodo_logo.description',
        'displayCond' => 'FIELD:is_siteroot:REQ:true',
        // One logo for every language of the site.
        'l10n_mode' => 'exclude',
        'config' => [
            'type' => 'file',
            'allowed' => 'svg,png,webp',
            'maxitems' => 1,
        ],
    ],
]);

ExtensionManagementUtility::addFieldsToPalette('pages', 'layout', '--linebreak--, tx_themekumanokodo_logo', 'after:layout');
