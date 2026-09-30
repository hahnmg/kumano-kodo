<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

ExtensionManagementUtility::addTCAcolumns('pages', [
    'tx_kumanokodo_logo' => [
        'label' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_logo',
        'description' => 'kumano_kodo.backend_fields:pages.tx_kumanokodo_logo.description',
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

ExtensionManagementUtility::addFieldsToPalette('pages', 'layout', '--linebreak--, tx_kumanokodo_logo', 'after:layout');
