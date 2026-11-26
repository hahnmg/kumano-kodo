<?php

declare(strict_types=1);

use TYPO3\CMS\ThemeKumanoKodo\Controller\SitesController;

return [
    'kumano_kodo_sites' => [
        'parent' => 'site',
        'access' => 'admin',
        'path' => '/module/site/kumano-kodo',
        'iconIdentifier' => 'module-sites',
        'labels' => 'theme_kumano_kodo.module',
        'routes' => [
            '_default' => [
                'target' => SitesController::class . '::indexAction',
            ],
            'create' => [
                'target' => SitesController::class . '::createAction',
                'methods' => ['POST'],
            ],
        ],
    ],
];
