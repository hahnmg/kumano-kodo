<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

$icons = [];
foreach (glob(__DIR__ . '/../Resources/Public/Icons/Content/*.svg') as $file) {
    $icons[basename($file, '.svg')] = [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:kumano_kodo/Resources/Public/Icons/Content/' . basename($file),
    ];
}
return $icons;
