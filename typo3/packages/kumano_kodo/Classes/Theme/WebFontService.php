<?php

declare(strict_types=1);

namespace KumanoKodo\Theme\Theme;

use Psr\Log\LoggerInterface;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Http\RequestFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;

// Stylesheet and font files are downloaded once into typo3temp, so visitors' browsers never contact Google.
final class WebFontService
{
    private const DIRECTORY = 'typo3temp/assets/kumano_kodo/fonts';
    private const FONT_HOST = 'fonts.gstatic.com';

    public function __construct(
        private readonly RequestFactory $requestFactory,
        private readonly LoggerInterface $logger,
    ) {}

    public static function url(string $family, string $spec): string
    {
        $query = str_replace(' ', '+', $family) . ($spec !== '' ? ':' . $spec : '');
        return 'https://fonts.googleapis.com/css2?family=' . $query . '&display=swap';
    }

    /** Local stylesheet path for a Google Fonts URL, or null when it could not be fetched. */
    public function local(string $url): ?string
    {
        $directory = self::DIRECTORY . '/' . sha1($url);
        $stylesheet = $directory . '/webfont.css';
        if (is_file(Environment::getPublicPath() . '/' . $stylesheet)) {
            return '/' . $stylesheet;
        }
        try {
            // Google answers with woff2 only to a browser it recognises.
            $css = (string)$this->requestFactory->request($url, 'GET', [
                'headers' => ['User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'],
            ])->getBody();
            GeneralUtility::mkdir_deep(Environment::getPublicPath() . '/' . $directory);
            preg_match_all('%url\((https://[^)]+)\)%', $css, $matches);
            foreach (array_unique($matches[1]) as $fontUrl) {
                if (parse_url($fontUrl, PHP_URL_HOST) !== self::FONT_HOST) {
                    continue;
                }
                $name = sha1($fontUrl) . '.' . pathinfo((string)parse_url($fontUrl, PHP_URL_PATH), PATHINFO_EXTENSION);
                GeneralUtility::writeFile(Environment::getPublicPath() . '/' . $directory . '/' . $name, (string)$this->requestFactory->request($fontUrl)->getBody());
                $css = str_replace($fontUrl, $name, $css);
            }
            GeneralUtility::writeFile(Environment::getPublicPath() . '/' . $stylesheet, $css);
            return '/' . $stylesheet;
        } catch (\Throwable $e) {
            $this->logger->warning('Web font {url} could not be downloaded: {message}', ['url' => $url, 'message' => $e->getMessage()]);
            return null;
        }
    }
}
