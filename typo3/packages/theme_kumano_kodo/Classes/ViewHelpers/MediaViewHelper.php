<?php

declare(strict_types=1);

namespace TYPO3\CMS\ThemeKumanoKodo\ViewHelpers;

use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

// The files of an image field as the theme shows them: images as they are, a video as {video, poster, width, height}.
// An image right after a video is its poster; YouTube and Vimeo fall back to their own preview.
final class MediaViewHelper extends AbstractViewHelper
{
    private const ONLINE = ['youtube', 'vimeo'];

    public function initializeArguments(): void
    {
        $this->registerArgument('items', 'iterable', 'Files or file references of an image field', true);
    }

    /**
     * @return list<FileInterface|array{video: FileInterface, poster: ?FileInterface, width: int, height: int}>
     */
    public function render(): array
    {
        $files = array_values(array_filter(
            is_array($this->arguments['items']) ? $this->arguments['items'] : iterator_to_array($this->arguments['items'] ?? [], false),
            static fn(mixed $file): bool => $file instanceof FileInterface,
        ));
        $media = [];
        for ($i = 0; $i < count($files); $i++) {
            $file = $files[$i];
            if (!$this->isVideo($file)) {
                $media[] = $file;
                continue;
            }
            $next = $files[$i + 1] ?? null;
            $poster = $next !== null && !$this->isVideo($next) ? $next : null;
            if ($poster !== null) {
                $i++;
            }
            $online = in_array(strtolower($file->getExtension()), self::ONLINE, true);
            // Without both sides from the file's metadata, a widescreen frame.
            [$width, $height] = [(int)$file->getProperty('width'), (int)$file->getProperty('height')];
            $media[] = [
                'video' => $file,
                'poster' => $poster ?? ($online ? $file : null),
                'width' => $width > 0 && $height > 0 ? $width : 16,
                'height' => $width > 0 && $height > 0 ? $height : 9,
            ];
        }
        return $media;
    }

    private function isVideo(FileInterface $file): bool
    {
        return str_starts_with($file->getMimeType(), 'video/') || in_array(strtolower($file->getExtension()), self::ONLINE, true);
    }
}
