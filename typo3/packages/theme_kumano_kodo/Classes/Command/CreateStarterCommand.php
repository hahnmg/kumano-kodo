<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use TYPO3\CMS\Core\Core\Bootstrap;
use TYPO3\CMS\Core\Localization\LanguageServiceFactory;
use TYPO3\CMS\ThemeKumanoKodo\Starter\StarterException;
use TYPO3\CMS\ThemeKumanoKodo\Starter\StarterInstaller;

#[AsCommand(name: 'kumano:starter:create', description: 'Create the five starter pages of Kumano Kodo as a site of its own')]
final class CreateStarterCommand extends Command
{
    public function __construct(
        private readonly StarterInstaller $installer,
        private readonly LanguageServiceFactory $languageServiceFactory,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('identifier', null, InputOption::VALUE_REQUIRED, 'Site identifier; default a free one such as kumano-kodo-starter')
            ->addOption('base', null, InputOption::VALUE_REQUIRED, 'Base path; default / for the first site, else /<identifier>/');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        Bootstrap::initializeBackendAuthentication();
        $suggested = $this->installer->suggest();
        $label = fn(string $key, array $arguments): string => vsprintf(
            (string)$this->languageServiceFactory->create('en')->sL('LLL:EXT:theme_kumano_kodo/Resources/Private/Language/module.xlf:' . $key),
            $arguments
        );
        try {
            $site = $this->installer->create(
                (string)($input->getOption('identifier') ?? $suggested['identifier']),
                (string)($input->getOption('base') ?? $suggested['base'])
            );
        } catch (StarterException $e) {
            $output->writeln('<error>' . $label($e->label, $e->arguments) . '</error>');
            return Command::FAILURE;
        }
        $output->writeln($label('created', [$site['identifier'], $site['rootPageId']]));
        return Command::SUCCESS;
    }
}
