<?php

declare(strict_types=1);

namespace KumanoKodo\Theme\Command;

use KumanoKodo\Theme\Demo\SiteInstaller;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'kumano:demo:create', description: 'Create the Kumano Kodo trail journal as a site of its own')]
final class CreateDemoCommand extends CreateSiteCommand
{
    protected function kind(): string
    {
        return SiteInstaller::DEMO;
    }
}
