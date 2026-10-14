<?php

// TYPO3's own rules (typo3/coding-standards) for the theme, the demo and the starter.
$config = \TYPO3\CodingStandards\CsFixerConfig::create();
$config->getFinder()
    ->in(__DIR__ . '/packages')
    ->exclude(['Documentation-GENERATED-temp'])
;

return $config;
