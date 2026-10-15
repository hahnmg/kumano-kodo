<?php

declare(strict_types=1);

namespace KumanoKodo\Theme\Command;

use KumanoKodo\Theme\Demo\SiteInstaller;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'kumano:starter:create', description: 'Create the five starter pages of Kumano Kodo as a site of its own')]
final class CreateStarterCommand extends CreateSiteCommand
{
    protected function kind(): string
    {
        return SiteInstaller::STARTER;
    }
}
