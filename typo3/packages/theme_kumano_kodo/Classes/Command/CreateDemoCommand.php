<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use TYPO3\CMS\ThemeKumanoKodo\Demo\SiteInstaller;

#[AsCommand(name: 'kumano:demo:create', description: 'Create the Kumano Kodo trail journal as a site of its own')]
final class CreateDemoCommand extends CreateSiteCommand
{
    protected function kind(): string
    {
        return SiteInstaller::DEMO;
    }
}
