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

    /** @var array<string, int> download slug => sys_file uid */
    private array $files = [];

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
        $this->importFiles($demo['files'] ?? []);
        foreach ($pages as $page) {
            $this->createPage($page);
        }
        foreach ($demo['pages'] as $page) {
            if (isset($page['flyout'])) {
                $this->addFlyout($page);
            }
        }
        $this->writeErrorHandling($demo['site']['errorHandling'] ?? []);
        $this->createFrontendUsers($demo['frontendUsers'] ?? []);
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
        $this->applyOrder();
        // This instance holds the records the export ships, so its own setup must not import them again.
        $this->registry->set('extensionDataImport', 'kumano_kodo_demo:Initialisation/dataImported', 1);
        $this->registry->set('siteConfigImport', self::SITE, 1);

        $output->writeln(sprintf('Built %d pages and %d content elements, root page %d.', count($this->pages), $elements, $this->pages['home']));
        return Command::SUCCESS;
    }

    // Downloads exist once per language; each file carries its title in its own language.
    private function importFiles(array $files): void
    {
        $storage = $this->storageRepository->getDefaultStorage();
        $folder = $storage->hasFolder('/kumano-kodo/downloads/')
            ? $storage->getFolder('/kumano-kodo/downloads/')
            : $storage->createFolder('downloads', $storage->getFolder('/kumano-kodo/'));
        $source = dirname(Environment::getProjectPath());
        foreach ($files as $slug => $entry) {
            $name = basename($entry['file']);
            $file = $storage->hasFileInFolder($name, $folder)
                ? $storage->getFileInFolder($name, $folder)
                : $storage->addFile($source . '/' . $entry['file'], $folder, $name, DuplicationBehavior::REPLACE, false);
            assert($file instanceof File);
            $file->getMetaData()->add(['title' => $entry['title']])->save();
            $this->files[$slug] = $file->getUid();
        }
    }

    // Users and their group live in a folder; the DataHandler hashes the password.
    private function createFrontendUsers(array $users): void
    {
        foreach ($users as $user) {
            $folder = $this->pages[$user['folder']];
            $group = $this->create('fe_groups', ['pid' => $folder, 'title' => $user['group']]);
            $this->create('fe_users', ['pid' => $folder, 'username' => $user['username'], 'password' => $user['password'], 'usergroup' => (string)$group]);
        }
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
            'description' => $page['description']['en'] ?? '',
            'slug' => $page['slug'],
            'nav_hide' => (int)$page['navHide'],
            'doktype' => $page['doktype'] ?? 1,
            'fe_group' => $page['feGroup'] ?? '',
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
            $this->translate('pages', $this->pages[$page['key']], $language, ['title' => $page['title'][$code], 'description' => $page['description'][$code] ?? '', 'slug' => $page['slug'], 'hidden' => 0]);
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

    /** Inline fields of content elements and pages, and the item table each holds. */
    private const ITEMS = [
        'tx_kumanokodo_entries' => 'tx_kumanokodo_entry',
        'tx_kumanokodo_links' => 'tx_kumanokodo_entry',
        'tx_kumanokodo_facts' => 'tx_kumanokodo_fact',
        'tx_kumanokodo_questions' => 'tx_kumanokodo_question',
        'tx_kumanokodo_stations' => 'tx_kumanokodo_station',
        'tx_kumanokodo_day_marks' => 'tx_kumanokodo_day_mark',
        'tx_kumanokodo_chips' => 'tx_kumanokodo_entry',
    ];

    // Nested records are written in steps: an inline child only attaches to a parent that is already saved.
    // Returns the number of elements created, children of containers included.
    private function createElement(array $element, int $pid, int $colPos, int $container = 0): int
    {
        $fields = ['pid' => $pid, 'colPos' => $colPos, 'CType' => $element['type'], 'hidden' => 0];
        foreach ($element['fields'] ?? [] as $field => $value) {
            $fields[$field] = $field === 'pi_flexform'
                ? preg_replace_callback('/page:([a-z0-9-]+)/', fn (array $m): string => (string)$this->pages[$m[1]], (string)$value)
                : $this->value($value, 'en');
        }
        if ($container > 0) {
            $fields['tx_container_parent'] = $container;
        }
        // A positive pid inserts at the top, so later elements go after the last one created there.
        $slot = $pid . ':' . $colPos . ':' . $container;
        if (isset($this->lastContent[$slot])) {
            $fields['pid'] = -$this->lastContent[$slot];
        }
        $data = ['tt_content' => ['NEWce' => $fields]];
        if ($element['image'] ?? []) {
            $data['tt_content']['NEWce']['image'] = $this->references($data, $element['image'], $pid);
        }
        foreach ($element['media']['en'] ?? [] as $i => $slug) {
            $data['sys_file_reference']['NEWfile' . $i] = ['pid' => $pid, 'uid_local' => $this->files[$slug]];
        }
        if ($element['media'] ?? []) {
            $data['tt_content']['NEWce']['media'] = implode(',', array_map(static fn (int $i): string => 'NEWfile' . $i, array_keys($element['media']['en'])));
        }
        $uid = $this->create('tt_content', $fields, $data);
        $this->lastContent[$slot] = $uid;
        $this->order[$slot][] = $uid;

        foreach ($element['items'] ?? [] as $field => $items) {
            $this->addItems('tt_content', $uid, $field, $items, $pid);
        }
        $count = 1;
        foreach ($element['children'] ?? [] as $childColPos => $children) {
            foreach ($children as $child) {
                $count += $this->createElement($child, $pid, (int)$childColPos, $uid);
            }
        }
        if ($container === 0) {
            foreach (self::LANGUAGES as $code => $language) {
                $this->translateElement($element, $uid, $language, $code);
            }
        }
        return $count;
    }

    // Translating a container translates its children (EXT:container); their texts are set afterwards.
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
        if ($element['media'] ?? []) {
            $this->syncInline('tt_content', $uid, 'media', $language);
            $this->relinkFiles($uid, $element['media'][$code], $language);
        }
        foreach ($element['items'] ?? [] as $field => $items) {
            $this->translateItems('tt_content', $uid, $field, $items, $language, $code);
        }
        foreach ($element['children'] ?? [] as $colPos => $children) {
            foreach ($this->childElements($uid, (int)$colPos) as $c => $childUid) {
                $this->translateElement($children[$c], $childUid, $language, $code);
            }
        }
    }

    private function addItems(string $table, int $uid, string $field, array $items, int $pid): void
    {
        $itemTable = self::ITEMS[$field];
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
        $this->process([$itemTable => $records, $table => [$uid => [$field => implode(',', array_keys($records))]]]);
        foreach ($this->children($itemTable, 'uid_foreign', $uid, $table, $field) as $i => $itemUid) {
            if (($items[$i]['image'] ?? '') !== '') {
                $data = [];
                $data[$itemTable][$itemUid]['image'] = $this->references($data, [$items[$i]['image']], $pid);
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
        $itemTable = self::ITEMS[$field];
        $this->syncInline($table, $uid, $field, $language);
        foreach ($this->children($itemTable, 'uid_foreign', $uid, $table, $field) as $i => $itemUid) {
            $fields = ['hidden' => 0];
            foreach ($items[$i] as $name => $value) {
                if (is_array($value)) {
                    $fields[$name] = $value[$code];
                }
            }
            $this->process([$itemTable => [$this->translationOf($itemTable, $itemUid, $language) => $fields]]);
            if (($items[$i]['image'] ?? '') !== '') {
                $this->syncInline($itemTable, $itemUid, 'image', $language);
            }
        }
    }

    // A translated download points to the file of its language instead of the default one.
    private function relinkFiles(int $uid, array $slugs, int $language): void
    {
        $query = $this->connectionPool->getQueryBuilderForTable('sys_file_reference');
        $query->getRestrictions()->removeAll()->add(GeneralUtility::makeInstance(DeletedRestriction::class));
        $references = $query->select('uid')->from('sys_file_reference')->where(
            $query->expr()->eq('uid_foreign', $query->createNamedParameter($uid, \Doctrine\DBAL\ParameterType::INTEGER)),
            $query->expr()->eq('tablenames', $query->createNamedParameter('tt_content')),
            $query->expr()->eq('fieldname', $query->createNamedParameter('media')),
            $query->expr()->eq('sys_language_uid', 0),
        )->orderBy('sorting_foreign')->executeQuery()->fetchFirstColumn();
        $data = [];
        foreach ($references as $i => $reference) {
            $data['sys_file_reference'][$this->translationOf('sys_file_reference', (int)$reference, $language)] = ['uid_local' => $this->files[$slugs[$i]]];
        }
        $this->process($data);
    }

    // A photo is a slug, or a slug with reference fields such as the chapter's width and step.
    private function references(array &$data, array $photos, int $pid): string
    {
        $ids = [];
        foreach ($photos as $photo) {
            $photo = is_array($photo) ? $photo : ['photo' => $photo];
            $id = 'NEWref' . count($data['sys_file_reference'] ?? []);
            $data['sys_file_reference'][$id] = ['pid' => $pid, 'uid_local' => $this->photos[$photo['photo']]] + array_diff_key($photo, ['photo' => 1]);
            $ids[] = $id;
        }
        return implode(',', $ids);
    }

    /** @return list<int> a container's children in one column, in their order */
    private function childElements(int $container, int $colPos): array
    {
        $query = $this->connectionPool->getQueryBuilderForTable('tt_content');
        $query->getRestrictions()->removeAll()->add(GeneralUtility::makeInstance(DeletedRestriction::class));
        return array_map('intval', $query->select('uid')->from('tt_content')->where(
            $query->expr()->eq('tx_container_parent', $query->createNamedParameter($container, \Doctrine\DBAL\ParameterType::INTEGER)),
            $query->expr()->eq('colPos', $query->createNamedParameter($colPos, \Doctrine\DBAL\ParameterType::INTEGER)),
            $query->expr()->eq('sys_language_uid', 0),
        )->orderBy('sorting')->executeQuery()->fetchFirstColumn());
    }

    private function value(mixed $value, string $code): mixed
    {
        return is_array($value) ? $value[$code] : $value;
    }

    /** @var array<string, list<int>> "pid:colPos:container" => elements in the order of the definition */
    private array $order = [];

    // Adding children to a container moves elements around; the definition's order is set once at the end.
    private function applyOrder(): void
    {
        $connection = $this->connectionPool->getConnectionForTable('tt_content');
        foreach ($this->order as $uids) {
            foreach ($uids as $position => $uid) {
                $sorting = ($position + 1) * 256;
                $connection->update('tt_content', ['sorting' => $sorting], ['uid' => $uid]);
                $connection->update('tt_content', ['sorting' => $sorting], ['l18n_parent' => $uid]);
            }
        }
    }

    /** @var array<string, int> "pid:colPos:container" => uid of the last element created there */
    private array $lastContent = [];

    private function writeSite(array $site): void
    {
        $languages = [
            ['languageId' => 0, 'title' => 'English', 'navigationTitle' => 'EN', 'locale' => 'en_US.UTF-8', 'hreflang' => 'en', 'base' => '/', 'flag' => 'en-us-gb'],
            ['languageId' => 1, 'title' => 'Deutsch', 'navigationTitle' => 'DE', 'locale' => 'de_DE.UTF-8', 'hreflang' => 'de', 'base' => '/de/', 'flag' => 'de', 'fallbackType' => 'strict'],
            ['languageId' => 2, 'title' => '日本語', 'navigationTitle' => 'JA', 'locale' => 'ja_JP.UTF-8', 'hreflang' => 'ja', 'base' => '/ja/', 'flag' => 'jp', 'fallbackType' => 'strict'],
        ];
        $this->siteConfiguration = [
            'rootPageId' => $this->pages['home'],
            'base' => '/',
            'websiteTitle' => $site['websiteTitle'],
            'dependencies' => ['kumano-kodo/site'],
            'languages' => $languages,
        ];
        $this->siteWriter->write(self::SITE, $this->siteConfiguration);
        $this->siteWriter->writeSettings(self::SITE, $site['settings']);
    }

    // Error pages are named by page key, so they can only be set once the pages exist.
    private function writeErrorHandling(array $pages): void
    {
        foreach ($pages as $code => $key) {
            $this->siteConfiguration['errorHandling'][] = ['errorCode' => (int)$code, 'errorHandler' => 'Page', 'errorContentSource' => 't3://page?uid=' . $this->pages[$key]];
        }
        $this->siteWriter->write(self::SITE, $this->siteConfiguration);
    }

    private array $siteConfiguration = [];

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
