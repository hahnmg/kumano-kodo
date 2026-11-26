<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Http\RedirectResponse;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Messaging\FlashMessage;
use TYPO3\CMS\Core\Messaging\FlashMessageService;
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;
use TYPO3\CMS\ThemeKumanoKodo\Starter\StarterException;
use TYPO3\CMS\ThemeKumanoKodo\Starter\StarterInstaller;

// Sites › Kumano Kodo: creates the starter as a site of its own, as kumano:starter:create does.
#[AsController]
final readonly class SitesController
{
    private const LABELS = 'LLL:EXT:theme_kumano_kodo/Resources/Private/Language/module.xlf:';

    public function __construct(
        private ModuleTemplateFactory $moduleTemplateFactory,
        private StarterInstaller $installer,
        private FlashMessageService $flashMessageService,
        private UriBuilder $uriBuilder,
    ) {}

    public function indexAction(ServerRequestInterface $request): ResponseInterface
    {
        $query = $request->getQueryParams();
        $view = $this->moduleTemplateFactory->create($request);
        $view->assignMultiple([
            'missing' => implode(', ', $this->installer->missingExtensions()),
            // After a failed attempt the form shows what was entered.
            'values' => array_replace($this->installer->suggest(), array_intersect_key(array_map('strval', $query), ['identifier' => 1, 'base' => 1])),
        ]);
        return $view->renderResponse('Backend/Sites');
    }

    // Post, redirect, get: a reload of the result does not create the site twice.
    public function createAction(ServerRequestInterface $request): ResponseInterface
    {
        $body = (array)$request->getParsedBody();
        $identifier = trim((string)($body['identifier'] ?? ''));
        $base = trim((string)($body['base'] ?? ''));
        $parameters = [];
        try {
            $site = $this->installer->create($identifier, $base);
            $this->flash('created', [$site['identifier'], $site['rootPageId']], ContextualFeedbackSeverity::OK);
        } catch (StarterException $e) {
            $this->flash($e->label, $e->arguments, ContextualFeedbackSeverity::ERROR);
            $parameters = ['identifier' => $identifier, 'base' => $base];
        }
        return new RedirectResponse((string)$this->uriBuilder->buildUriFromRoute('kumano_kodo_sites', $parameters), 303);
    }

    private function flash(string $label, array $arguments, ContextualFeedbackSeverity $severity): void
    {
        $message = vsprintf((string)$this->getLanguageService()->sL(self::LABELS . $label), $arguments);
        $this->flashMessageService->getMessageQueueByIdentifier()->enqueue(new FlashMessage($message, '', $severity, true));
    }

    private function getLanguageService(): LanguageService
    {
        return $GLOBALS['LANG'];
    }
}
