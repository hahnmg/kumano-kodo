<?php

declare(strict_types=1);

// The theme's parts as Fluid components, for its own templates and for extensions:
// <kk:teaserCard …/> with xmlns:kk="http://typo3.org/ns/TYPO3/CMS/ThemeKumanoKodo/Components".
return [
    'TYPO3\\CMS\\ThemeKumanoKodo\\Components' => [
        'templatePaths' => [
            10 => 'EXT:theme_kumano_kodo/Resources/Private/Components',
        ],
    ],
];
