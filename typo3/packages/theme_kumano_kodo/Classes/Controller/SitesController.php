<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;
use TYPO3\CMS\ThemeKumanoKodo\Demo\SiteInstaller;

// Sites › Kumano Kodo: creates the demo or the starter as a site of its own, as kumano:demo:create does.
#[AsController]
final readonly class SitesController
{
    public function __construct(
        private ModuleTemplateFactory $moduleTemplateFactory,
        private SiteInstaller $installer,
    ) {}

    public function indexAction(ServerRequestInterface $request): ResponseInterface
    {
        return $this->render($request);
    }

    public function createAction(ServerRequestInterface $request): ResponseInterface
    {
        $body = (array)$request->getParsedBody();
        $kind = (string)($body['kind'] ?? '');
        $suggested = $this->installer->suggest($kind === SiteInstaller::STARTER ? SiteInstaller::STARTER : SiteInstaller::DEMO);
        $identifier = trim((string)($body['identifier'] ?? '')) ?: $suggested['identifier'];
        $base = trim((string)($body['base'] ?? '')) ?: $suggested['base'];
        try {
            $site = $this->installer->create($kind, $identifier, $base);
            $message = [sprintf('Created the site "%s" with root page %d.', $site['identifier'], $site['rootPageId']), ContextualFeedbackSeverity::OK];
        } catch (\RuntimeException|\InvalidArgumentException $e) {
            $message = [$e->getMessage(), ContextualFeedbackSeverity::ERROR];
        }
        return $this->render($request, $message);
    }

    private function render(ServerRequestInterface $request, ?array $message = null): ResponseInterface
    {
        $view = $this->moduleTemplateFactory->create($request);
        if ($message !== null) {
            $view->addFlashMessage($message[0], '', $message[1]);
        }
        $view->assign('kinds', array_map(fn(string $kind): array => [
            'kind' => $kind,
            'missing' => implode(', ', $this->installer->missingExtensions($kind)),
        ] + $this->installer->suggest($kind), [SiteInstaller::DEMO, SiteInstaller::STARTER]));
        return $view->renderResponse('Backend/Sites');
    }
}
