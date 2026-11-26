<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use TYPO3\CMS\ThemeKumanoKodo\Demo\SiteInstaller;

#[AsCommand(name: 'kumano:starter:create', description: 'Create the five starter pages of Kumano Kodo as a site of its own')]
final class CreateStarterCommand extends CreateSiteCommand
{
    protected function kind(): string
    {
        return SiteInstaller::STARTER;
    }
}
