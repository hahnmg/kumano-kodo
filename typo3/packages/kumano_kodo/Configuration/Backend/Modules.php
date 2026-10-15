<?php

declare(strict_types=1);

use KumanoKodo\Theme\Controller\SitesController;

return [
    'kumano_kodo_sites' => [
        'parent' => 'site',
        'access' => 'admin',
        'path' => '/module/site/kumano-kodo',
        'iconIdentifier' => 'module-sites',
        'labels' => 'kumano_kodo.module',
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
