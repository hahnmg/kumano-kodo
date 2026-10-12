<?php

declare(strict_types=1);

namespace KumanoKodo\Demo\Form;

use TYPO3\CMS\Core\Resource\StorageRepository;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Form\Slot\FilePersistenceSlot;

// The demo form shows a content element by uid, and uids change with every build and import. Its definition is
// therefore a template in the package; this writes it to fileadmin with the element's current uid.
final readonly class WalkForm
{
    public const TEMPLATE = 'EXT:kumano_kodo_demo/Resources/Private/Forms/walk.form.yaml';
    public const FOLDER = 'form_definitions';
    public const FILE = 'walk.form.yaml';
    /** The key of the element in Build/Demo/content.json. */
    public const CONTENT_KEY = 'walk-luggage';

    public function __construct(
        private StorageRepository $storageRepository,
        private FilePersistenceSlot $filePersistenceSlot,
    ) {}

    public function templateUid(): int
    {
        preg_match('/contentElementUid: (\d+)/', $this->template(), $m);
        return (int)($m[1] ?? 0);
    }

    // The build records the uid in the template too, so the export ships it and an import can map it.
    public function setTemplateUid(int $uid): void
    {
        file_put_contents($this->templatePath(), $this->withUid($this->template(), $uid));
    }

    public function write(int $uid): void
    {
        $storage = $this->storageRepository->getDefaultStorage();
        $folder = $storage->hasFolder(self::FOLDER) ? $storage->getFolder(self::FOLDER) : $storage->createFolder(self::FOLDER);
        $content = $this->withUid($this->template(), $uid);
        // EXT:form guards form definitions in storages; writes outside its editor need its leave.
        $identifier = $storage->getUid() . ':' . $folder->getIdentifier() . self::FILE;
        $this->filePersistenceSlot->allowInvocation(FilePersistenceSlot::COMMAND_FILE_CREATE, $identifier);
        $this->filePersistenceSlot->allowInvocation(FilePersistenceSlot::COMMAND_FILE_SET_CONTENTS, $identifier, $this->filePersistenceSlot->getContentSignature($content));
        $file = $folder->hasFile(self::FILE) ? $folder->getFile(self::FILE) : $folder->createFile(self::FILE);
        $file->setContents($content);
    }

    private function withUid(string $yaml, int $uid): string
    {
        return (string)preg_replace('/contentElementUid: \d+/', 'contentElementUid: ' . $uid, $yaml);
    }

    private function template(): string
    {
        return (string)file_get_contents($this->templatePath());
    }

    private function templatePath(): string
    {
        return GeneralUtility::getFileAbsFileName(self::TEMPLATE);
    }
}
