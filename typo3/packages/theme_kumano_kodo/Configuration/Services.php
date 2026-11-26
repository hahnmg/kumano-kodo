<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use TYPO3\CMS\Form\Command\TransferFormDefinitionCommand;
use TYPO3\CMS\ThemeKumanoKodo\Demo\BuildCommand;
use TYPO3\CMS\ThemeKumanoKodo\Demo\WalkForm;

// The demo's walk form is stored through EXT:form; without it the theme runs and only the demo is unavailable.
return static function (ContainerConfigurator $configurator): void {
    if (!class_exists(TransferFormDefinitionCommand::class)) {
        return;
    }
    $services = $configurator->services()->defaults()->autowire()->autoconfigure();
    $services->set(WalkForm::class);
    $services->set(BuildCommand::class);
};
