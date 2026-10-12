<?php

declare(strict_types=1);

// The theme's parts as Fluid components, for its own templates and for extensions:
// <kk:teaserCard …/> with xmlns:kk="http://typo3.org/ns/KumanoKodo/Sitepackage/Components".
return [
    'KumanoKodo\\Sitepackage\\Components' => [
        'templatePaths' => [
            10 => 'EXT:kumano_kodo/Resources/Private/Components',
        ],
    ],
];
