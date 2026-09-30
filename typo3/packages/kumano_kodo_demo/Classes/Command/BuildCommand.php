<?php

declare(strict_types=1);

namespace KumanoKodo\Demo\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\CMS\Core\Core\Bootstrap;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\Restriction\DeletedRestriction;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Core\Exception\SiteNotFoundException;
use TYPO3\CMS\Core\Registry;
use TYPO3\CMS\Core\Resource\Enum\DuplicationBehavior;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\StorageRepository;
use TYPO3\CMS\Core\Site\SiteFinder;
use TYPO3\CMS\Core\Utility\GeneralUtility;

// Input comes from scripts/export-demo.mjs; Initialisation/data.xml is the impexp export of the result.

#[AsCommand(name: 'kumano:demo:build', description: 'Build the Kumano Kodo demo pages and content from Build/Demo/content.json')]
final class BuildCommand extends Command
{
    private const SITE = 'kumano-kodo';
    private const LANGUAGES = ['de' => 1, 'ja' => 2];

    /** @var array<string, int> page key => uid */
    private array $pages = [];
    /** @var array<string, int> photo slug => sys_file uid */
    private array $photos = [];

    public function __construct(
        private readonly ConnectionPool $connectionPool,
        private readonly SiteFinder $siteFinder,
        private readonly SiteWriter $siteWriter,
        private readonly StorageRepository $storageRepository,
        private readonly Registry $registry,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('json', null, InputOption::VALUE_REQUIRED, 'Demo definition', Environment::getProjectPath() . '/Build/Demo/content.json')
            ->addOption('replace', null, InputOption::VALUE_NONE, 'Delete an existing demo site and its page tree first');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        Bootstrap::initializeBackendAuthentication();
        $demo = json_decode((string)file_get_contents($input->getOption('json')), true, 512, JSON_THROW_ON_ERROR);

        try {
            $site = $this->siteFinder->getSiteByIdentifier(self::SITE);
            if (!$input->getOption('replace')) {
                $output->writeln('<error>The demo site exists. Run again with --replace to rebuild it.</error>');
                return Command::FAILURE;
            }
            $this->process(cmd: ['pages' => [$site->getRootPageId() => ['delete' => 1]]]);
            $this->siteWriter->delete(self::SITE);
        } catch (SiteNotFoundException) {
        }

        // Translations need the site's languages, and the site needs its root page.
        [$home, $pages] = [$demo['pages'][0], array_slice($demo['pages'], 1)];
        $this->createPage($home, false);
        $this->writeSite($demo['site']);
        $this->translatePage($home);
        $this->importPhotos($demo['photos']);
        foreach ($pages as $page) {
            $this->createPage($page);
        }
        foreach ($demo['pages'] as $page) {
            if (isset($page['flyout'])) {
                $this->addFlyout($page);
            }
        }
        $elements = 0;
        foreach ($demo['pages'] as $page) {
            $uid = $this->pages[$page['key']];
            if (isset($page['chips'])) {
                $this->addItems('pages', $uid, 'tx_kumanokodo_chips', $page['chips'], $uid);
            }
            foreach ($page['content'] as $element) {
                $elements += $this->createElement($element, $uid, (int)($element['colPos'] ?? 0));
            }
        }
        // This instance holds the records the export ships, so its own setup must not import them again.
        $this->registry->set('extensionDataImport', 'kumano_kodo_demo:Initialisation/dataImported', 1);
        $this->registry->set('siteConfigImport', self::SITE, 1);

        $output->writeln(sprintf('Built %d pages and %d content elements, root page %d.', count($this->pages), $elements, $this->pages['home']));
        return Command::SUCCESS;
    }

    private function importPhotos(array $photos): void
    {
        $storage = $this->storageRepository->getDefaultStorage();
        $folder = $storage->hasFolder('/kumano-kodo/photos/')
            ? $storage->getFolder('/kumano-kodo/photos/')
            : $storage->createFolder('photos', $storage->hasFolder('/kumano-kodo/') ? $storage->getFolder('/kumano-kodo/') : $storage->createFolder('kumano-kodo'));
        // The repository root sits above the Composer root.
        $source = dirname(Environment::getProjectPath());
        foreach ($photos as $slug => $photo) {
            $name = $slug . '.jpg';
            $file = $storage->hasFileInFolder($name, $folder)
                ? $storage->getFileInFolder($name, $folder)
                : $storage->addFile($source . '/' . $photo['file'], $folder, $name, DuplicationBehavior::REPLACE, false);
            assert($file instanceof File);
            $file->getMetaData()->add(['alternative' => $photo['alt']['en'], 'description' => $photo['caption']['en']])->save();
            $this->photos[$slug] = $file->getUid();
            $metaUid = (int)$file->getMetaData()->offsetGet('uid');
            foreach (self::LANGUAGES as $code => $language) {
                $this->translate('sys_file_metadata', $metaUid, $language, ['alternative' => $photo['alt'][$code], 'description' => $photo['caption'][$code]]);
            }
        }
    }

    private function createPage(array $page, bool $translate = true): void
    {
        $parent = $page['parent'] === null ? 0 : $this->pages[$page['parent']];
        // A positive pid inserts at the top, so later siblings go after the last one created.
        $siblings = array_filter($this->pages, fn (string $key) => ($this->parentOf[$key] ?? null) === $page['parent'], ARRAY_FILTER_USE_KEY);
        $pid = $siblings === [] ? $parent : -end($siblings);
        $fields = [
            'pid' => $pid,
            'title' => $page['title']['en'],
            'slug' => $page['slug'],
            'nav_hide' => (int)$page['navHide'],
            'backend_layout' => 'pagets__' . $page['layout'],
            'backend_layout_next_level' => isset($page['nextLayout']) ? 'pagets__' . $page['nextLayout'] : '',
            'is_siteroot' => (int)($page['parent'] === null),
            'hidden' => 0,
        ];
        // Importing keeps the core from writing an autogenerated site for the new root page.
        $uid = $this->create('pages', $fields, importing: $page['parent'] === null);
        $this->pages[$page['key']] = $uid;
        $this->parentOf[$page['key']] = $page['parent'];
        if ($translate) {
            $this->translatePage($page);
        }
    }

    private function translatePage(array $page): void
    {
        foreach (self::LANGUAGES as $code => $language) {
            $this->translate('pages', $this->pages[$page['key']], $language, ['title' => $page['title'][$code], 'slug' => $page['slug'], 'hidden' => 0]);
        }
    }

    /** @var array<string, string|null> page key => parent key */
    private array $parentOf = [];

    private function addFlyout(array $page): void
    {
        $uid = $this->pages[$page['key']];
        $flyout = $page['flyout'];
        $data = ['pages' => [$uid => ['tx_kumanokodo_flyout' => $flyout['kind']]]];
        $columns = [];
        foreach ($flyout['columns'] as $c => $column) {
            $columnId = 'NEWcol' . $c;
            $columns[] = $columnId;
            $data['tx_kumanokodo_nav_column'][$columnId] = ['pid' => $uid, 'title' => $column['title']['en']];
        }
        $data['pages'][$uid]['tx_kumanokodo_flyout_columns'] = implode(',', $columns);
        if (isset($flyout['text'])) {
            $data['pages'][$uid] += [
                'tx_kumanokodo_flyout_text_title' => $flyout['text']['title']['en'],
                'tx_kumanokodo_flyout_text' => $flyout['text']['html']['en'],
                'tx_kumanokodo_flyout_overview' => $this->link($flyout['overview']['link']),
                'tx_kumanokodo_flyout_overview_label' => $flyout['overview']['label']['en'],
            ];
        }
        if (isset($flyout['teaser'])) {
            $teaser = $flyout['teaser'];
            $data['sys_file_reference']['NEWteaser'] = ['pid' => $uid, 'uid_local' => $this->photos[$teaser['image']]];
            $data['pages'][$uid] += [
                'tx_kumanokodo_flyout_teaser_image' => 'NEWteaser',
                'tx_kumanokodo_flyout_teaser_title' => $teaser['title']['en'],
                'tx_kumanokodo_flyout_teaser_subtitle' => $teaser['subtitle']['en'],
                'tx_kumanokodo_flyout_teaser_meta' => $teaser['meta']['en'],
                'tx_kumanokodo_flyout_teaser_badge' => $teaser['badge']['en'],
                'tx_kumanokodo_flyout_teaser_link' => $this->link($teaser['link']),
            ];
        }
        $this->process($data);
        // Nested inline children only attach to a parent that is already saved.
        foreach ($this->children('tx_kumanokodo_nav_column', 'page', $uid) as $c => $columnUid) {
            $links = [];
            foreach ($flyout['columns'][$c]['links'] as $l => $link) {
                $links['NEWlink' . $l] = ['pid' => $uid, 'label' => $link['label']['en'], 'link' => $this->link($link['link'])];
            }
            $this->process(['tx_kumanokodo_link' => $links, 'tx_kumanokodo_nav_column' => [$columnUid => ['links' => implode(',', array_keys($links))]]]);
        }

        foreach (self::LANGUAGES as $code => $language) {
            $translation = $this->translationOf('pages', $uid, $language);
            $fields = [];
            if (isset($flyout['text'])) {
                $fields = [
                    'tx_kumanokodo_flyout_text_title' => $flyout['text']['title'][$code],
                    'tx_kumanokodo_flyout_text' => $flyout['text']['html'][$code],
                    'tx_kumanokodo_flyout_overview_label' => $flyout['overview']['label'][$code],
                ];
            }
            if (isset($flyout['teaser'])) {
                $fields += [
                    'tx_kumanokodo_flyout_teaser_title' => $flyout['teaser']['title'][$code],
                    'tx_kumanokodo_flyout_teaser_subtitle' => $flyout['teaser']['subtitle'][$code],
                    'tx_kumanokodo_flyout_teaser_meta' => $flyout['teaser']['meta'][$code],
                    'tx_kumanokodo_flyout_teaser_badge' => $flyout['teaser']['badge'][$code],
                ];
            }
            $this->process(['pages' => [$translation => $fields]]);
            $this->syncInline('pages', $uid, 'tx_kumanokodo_flyout_columns', $language);
            $this->syncInline('pages', $uid, 'tx_kumanokodo_flyout_teaser_image', $language);
            foreach ($this->children('tx_kumanokodo_nav_column', 'page', $uid) as $c => $columnUid) {
                $column = $flyout['columns'][$c];
                $this->process(['tx_kumanokodo_nav_column' => [$this->translationOf('tx_kumanokodo_nav_column', $columnUid, $language) => ['title' => $column['title'][$code]]]]);
                $this->syncInline('tx_kumanokodo_nav_column', $columnUid, 'links', $language);
                foreach ($this->children('tx_kumanokodo_link', 'uid_foreign', $columnUid, 'tx_kumanokodo_nav_column') as $l => $linkUid) {
                    $this->process(['tx_kumanokodo_link' => [$this->translationOf('tx_kumanokodo_link', $linkUid, $language) => ['label' => $column['links'][$l]['label'][$code]]]]);
                }
            }
        }
    }

    // Nested inline records are written in steps: they only attach to a parent that is already saved.
    // Returns the number of elements created, children included.
    private function createElement(array $element, int $pid, int $colPos, int $parent = 0, string $column = ''): int
    {
        $fields = ['pid' => $pid, 'colPos' => $colPos, 'CType' => $element['type'], 'hidden' => 0];
        foreach ($element['fields'] ?? [] as $field => $value) {
            $fields[$field] = $this->value($value, 'en');
        }
        if ($parent > 0) {
            $fields += ['tx_kumanokodo_parent' => $parent, 'tx_kumanokodo_column' => $column];
        }
        // A positive pid inserts at the top, so later elements go after the last one created there.
        $slot = $pid . ':' . $colPos . ':' . $parent . ':' . $column;
        if (isset($this->lastContent[$slot])) {
            $fields['pid'] = -$this->lastContent[$slot];
        }
        $data = ['tt_content' => ['NEWce' => $fields]];
        if ($element['image'] ?? []) {
            $data['tt_content']['NEWce']['image'] = $this->references($data, $element['image'], $pid);
        }
        $uid = $this->create('tt_content', $fields, $data);
        $this->lastContent[$slot] = $uid;

        foreach (['items' => 'tx_kumanokodo_items', 'items2' => 'tx_kumanokodo_items2'] as $key => $field) {
            if ($element[$key] ?? []) {
                $this->addItems('tt_content', $uid, $field, $element[$key], $pid);
            }
        }
        if ($element['links'] ?? []) {
            $links = [];
            foreach ($element['links'] as $l => $link) {
                $links['NEWlink' . $l] = ['pid' => $pid, 'label' => $link['label']['en'], 'link' => $this->link($link['link'])];
            }
            $this->process(['tx_kumanokodo_link' => $links, 'tt_content' => [$uid => ['tx_kumanokodo_links' => implode(',', array_keys($links))]]]);
        }
        $count = 1;
        foreach ($element['children'] ?? [] as $childColumn => $children) {
            $uids = [];
            foreach ($children as $child) {
                $count += $this->createElement($child, $pid, $colPos, $uid, $childColumn);
                $uids[] = $this->lastContent[$pid . ':' . $colPos . ':' . $uid . ':' . $childColumn];
            }
            $this->process(['tt_content' => [$uid => ['tx_kumanokodo_column_' . $childColumn => implode(',', $uids)]]]);
        }
        if ($parent === 0) {
            foreach (self::LANGUAGES as $code => $language) {
                $this->translateElement($element, $uid, $language, $code);
            }
        }
        return $count;
    }

    private function translateElement(array $element, int $uid, int $language, string $code): void
    {
        $fields = ['hidden' => 0];
        foreach ($element['fields'] ?? [] as $field => $value) {
            if (is_array($value)) {
                $fields[$field] = $value[$code];
            }
        }
        $this->translate('tt_content', $uid, $language, $fields);
        if ($element['image'] ?? []) {
            $this->syncInline('tt_content', $uid, 'image', $language);
        }
        foreach (['items' => 'tx_kumanokodo_items', 'items2' => 'tx_kumanokodo_items2'] as $key => $field) {
            if ($element[$key] ?? []) {
                $this->translateItems('tt_content', $uid, $field, $element[$key], $language, $code);
            }
        }
        if ($element['links'] ?? []) {
            $this->syncInline('tt_content', $uid, 'tx_kumanokodo_links', $language);
            foreach ($this->children('tx_kumanokodo_link', 'uid_foreign', $uid, 'tt_content') as $l => $linkUid) {
                $this->process(['tx_kumanokodo_link' => [$this->translationOf('tx_kumanokodo_link', $linkUid, $language) => ['label' => $element['links'][$l]['label'][$code], 'hidden' => 0]]]);
            }
        }
        foreach ($element['children'] ?? [] as $column => $children) {
            $this->syncInline('tt_content', $uid, 'tx_kumanokodo_column_' . $column, $language);
            foreach ($this->childElements($uid, $column) as $c => $childUid) {
                $this->translateElement($children[$c], $childUid, $language, $code);
            }
        }
    }

    /** Items of one inline field; their images are attached once the items are saved. */
    private function addItems(string $table, int $uid, string $field, array $items, int $pid): void
    {
        $records = [];
        foreach ($items as $i => $item) {
            $record = ['pid' => $pid, 'hidden' => 0];
            foreach ($item as $name => $value) {
                if ($name !== 'image') {
                    $record[$name] = $name === 'link' ? $this->link((string)$value) : $this->value($value, 'en');
                }
            }
            $records['NEWitem' . $i] = $record;
        }
        $this->process(['tx_kumanokodo_item' => $records, $table => [$uid => [$field => implode(',', array_keys($records))]]]);
        foreach ($this->children('tx_kumanokodo_item', 'uid_foreign', $uid, $table, $field) as $i => $itemUid) {
            if (($items[$i]['image'] ?? '') !== '') {
                $data = [];
                $data['tx_kumanokodo_item'][$itemUid]['image'] = $this->references($data, [$items[$i]['image']], $pid);
                $this->process($data);
            }
        }
        if ($table === 'pages') {
            foreach (self::LANGUAGES as $code => $language) {
                $this->translateItems($table, $uid, $field, $items, $language, $code);
            }
        }
    }

    private function translateItems(string $table, int $uid, string $field, array $items, int $language, string $code): void
    {
        $this->syncInline($table, $uid, $field, $language);
        foreach ($this->children('tx_kumanokodo_item', 'uid_foreign', $uid, $table, $field) as $i => $itemUid) {
            $fields = ['hidden' => 0];
            foreach ($items[$i] as $name => $value) {
                if (is_array($value)) {
                    $fields[$name] = $value[$code];
                }
            }
            $this->process(['tx_kumanokodo_item' => [$this->translationOf('tx_kumanokodo_item', $itemUid, $language) => $fields]]);
            if (($items[$i]['image'] ?? '') !== '') {
                $this->syncInline('tx_kumanokodo_item', $itemUid, 'image', $language);
            }
        }
    }

    /** Adds file references for photo slugs to a datamap and returns their placeholders. */
    private function references(array &$data, array $slugs, int $pid): string
    {
        $ids = [];
        foreach ($slugs as $slug) {
            $id = 'NEWref' . count($data['sys_file_reference'] ?? []);
            $data['sys_file_reference'][$id] = ['pid' => $pid, 'uid_local' => $this->photos[$slug]];
            $ids[] = $id;
        }
        return implode(',', $ids);
    }

    /** @return list<int> the section's children in one column, in their order */
    private function childElements(int $parent, string $column): array
    {
        $query = $this->connectionPool->getQueryBuilderForTable('tt_content');
        $query->getRestrictions()->removeAll()->add(GeneralUtility::makeInstance(DeletedRestriction::class));
        return array_map('intval', $query->select('uid')->from('tt_content')->where(
            $query->expr()->eq('tx_kumanokodo_parent', $query->createNamedParameter($parent, \Doctrine\DBAL\ParameterType::INTEGER)),
            $query->expr()->eq('tx_kumanokodo_column', $query->createNamedParameter($column)),
            $query->expr()->eq('sys_language_uid', 0),
        )->orderBy('sorting')->executeQuery()->fetchFirstColumn());
    }

    private function value(mixed $value, string $code): mixed
    {
        return is_array($value) ? $value[$code] : $value;
    }

    /** @var array<string, int> "pid:colPos:parent:column" => uid of the last element created there */
    private array $lastContent = [];

    private function writeSite(array $site): void
    {
        $languages = [
            ['languageId' => 0, 'title' => 'English', 'navigationTitle' => 'EN', 'locale' => 'en_US.UTF-8', 'hreflang' => 'en', 'base' => '/', 'flag' => 'en-us-gb'],
            ['languageId' => 1, 'title' => 'Deutsch', 'navigationTitle' => 'DE', 'locale' => 'de_DE.UTF-8', 'hreflang' => 'de', 'base' => '/de/', 'flag' => 'de', 'fallbackType' => 'strict'],
            ['languageId' => 2, 'title' => '日本語', 'navigationTitle' => 'JA', 'locale' => 'ja_JP.UTF-8', 'hreflang' => 'ja', 'base' => '/ja/', 'flag' => 'jp', 'fallbackType' => 'strict'],
        ];
        $this->siteWriter->write(self::SITE, [
            'rootPageId' => $this->pages['home'],
            'base' => '/',
            'dependencies' => ['kumano-kodo/site'],
            'languages' => $languages,
        ]);
        $this->siteWriter->writeSettings(self::SITE, $site['settings']);
    }

    private function link(string $link): string
    {
        if (!str_starts_with($link, 'page:')) {
            return $link;
        }
        [$key, $hash] = array_pad(explode('#', substr($link, 5), 2), 2, '');
        return 't3://page?uid=' . $this->pages[$key] . ($hash !== '' ? '#' . $hash : '');
    }

    private function create(string $table, array $fields, ?array $data = null, bool $importing = false): int
    {
        $data ??= [$table => ['NEW' => $fields]];
        $handler = $this->process($data, importing: $importing);
        return (int)$handler->substNEWwithIDs[array_key_first($data[$table])];
    }

    // Photos outlive a rebuild, so their metadata may already be translated.
    private function translate(string $table, int $uid, int $language, array $fields): void
    {
        $translation = $this->findTranslation($table, $uid, $language);
        if ($translation === null) {
            $this->process(cmd: [$table => [$uid => ['localize' => $language]]]);
            $translation = $this->translationOf($table, $uid, $language);
        }
        if ($fields !== []) {
            $this->process([$table => [$translation => $fields]]);
        }
    }

    private function syncInline(string $table, int $uid, string $field, int $language): void
    {
        $this->process(cmd: [$table => [$uid => ['inlineLocalizeSynchronize' => ['field' => $field, 'language' => $language, 'action' => 'localize']]]]);
    }

    private function translationOf(string $table, int $uid, int $language): int
    {
        return $this->findTranslation($table, $uid, $language)
            ?? throw new \RuntimeException(sprintf('%s:%d has no translation to language %d', $table, $uid, $language), 1790000001);
    }

    private function findTranslation(string $table, int $uid, int $language): ?int
    {
        $pointer = $table === 'sys_file_metadata' ? 'l10n_parent' : ($GLOBALS['TCA'][$table]['ctrl']['transOrigPointerField'] ?? 'l10n_parent');
        $query = $this->connectionPool->getQueryBuilderForTable($table);
        // New translations start hidden, so only deleted rows are excluded.
        $query->getRestrictions()->removeAll()->add(GeneralUtility::makeInstance(DeletedRestriction::class));
        $translation = $query->select('uid')->from($table)->where(
            $query->expr()->eq($pointer, $query->createNamedParameter($uid, \Doctrine\DBAL\ParameterType::INTEGER)),
            $query->expr()->eq('sys_language_uid', $query->createNamedParameter($language, \Doctrine\DBAL\ParameterType::INTEGER)),
        )->executeQuery()->fetchOne();
        return $translation === false ? null : (int)$translation;
    }

    /** @return list<int> default language children in their sorting */
    private function children(string $table, string $parentField, int $parent, ?string $parentTable = null, ?string $fieldname = null): array
    {
        $query = $this->connectionPool->getQueryBuilderForTable($table);
        $query->getRestrictions()->removeAll()->add(GeneralUtility::makeInstance(DeletedRestriction::class));
        $query->select('uid')->from($table)->where(
            $query->expr()->eq($parentField, $query->createNamedParameter($parent, \Doctrine\DBAL\ParameterType::INTEGER)),
            $query->expr()->eq('sys_language_uid', 0),
        )->orderBy($GLOBALS['TCA'][$table]['ctrl']['sortby']);
        if ($parentTable !== null) {
            $query->andWhere($query->expr()->eq('tablename', $query->createNamedParameter($parentTable)));
        }
        if ($fieldname !== null) {
            $query->andWhere($query->expr()->eq('fieldname', $query->createNamedParameter($fieldname)));
        }
        return array_map('intval', $query->executeQuery()->fetchFirstColumn());
    }

    private function process(array $data = [], array $cmd = [], bool $importing = false): DataHandler
    {
        $handler = GeneralUtility::makeInstance(DataHandler::class);
        $handler->isImporting = $importing;
        $handler->start($data, $cmd);
        $handler->process_datamap();
        $handler->process_cmdmap();
        if ($handler->errorLog !== []) {
            throw new \RuntimeException(implode("\n", $handler->errorLog), 1790000002);
        }
        return $handler;
    }
}
