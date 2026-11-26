<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use TYPO3\CMS\Core\Core\Bootstrap;
use TYPO3\CMS\ThemeKumanoKodo\Demo\SiteInstaller;

// kumano:demo:create and kumano:starter:create; the backend module calls the same installer.
abstract class CreateSiteCommand extends Command
{
    public function __construct(private readonly SiteInstaller $installer)
    {
        parent::__construct();
    }

    abstract protected function kind(): string;

    protected function configure(): void
    {
        $this
            ->addOption('identifier', null, InputOption::VALUE_REQUIRED, 'Site identifier; default a free one such as kumano-kodo-' . $this->kind())
            ->addOption('base', null, InputOption::VALUE_REQUIRED, 'Base path; default / for the first site, else /<identifier>/');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        Bootstrap::initializeBackendAuthentication();
        $suggested = $this->installer->suggest($this->kind());
        try {
            $site = $this->installer->create(
                $this->kind(),
                (string)($input->getOption('identifier') ?? $suggested['identifier']),
                (string)($input->getOption('base') ?? $suggested['base'])
            );
        } catch (\RuntimeException $e) {
            $output->writeln('<error>' . $e->getMessage() . '</error>');
            return Command::FAILURE;
        }
        $output->writeln(sprintf('Created the site "%s" with root page %d.', $site['identifier'], $site['rootPageId']));
        return Command::SUCCESS;
    }
}
