// Writes the starter set: five pages with placeholder texts a new site replaces, in the shape kumano:demo:build reads.
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'typo3/packages/kumano_kodo_demo/Resources/Private/Starter/starter.json');

const t = (en, de, ja) => ({ en, de, ja });
const p = (text) => ({ en: `<p>${text.en}</p>`, de: `<p>${text.de}</p>`, ja: `<p>${text.ja}</p>` });
const el = (type, fields = {}, extra = {}) => ({ type, fields, ...extra });
const text = (body) => el('text', { bodytext: p(body) });
const links = (header, items, colPos) => ({
    ...el('kumano_list', { tx_kumanokodo_variant: 'links', header }, { items: { tx_kumanokodo_entries: items } }),
    colPos,
});
const page = (key, parent, slug, title, extra = {}) => ({
    key,
    parent,
    slug,
    layout: 'Default',
    navHide: false,
    title,
    content: [],
    ...extra,
});

const titles = {
    home: t('Home', 'Start', 'ホーム'),
    about: t('About us', 'Über uns', '私たちについて'),
    contact: t('Contact', 'Kontakt', 'お問い合わせ'),
    imprint: t('Imprint', 'Impressum', '運営者情報'),
    privacy: t('Privacy', 'Datenschutz', 'プライバシー'),
};
const formFlexform =
    '<?xml version="1.0" encoding="utf-8" standalone="yes" ?><T3FlexForms><data><sheet index="sDEF"><language index="lDEF">' +
    '<field index="settings.persistenceIdentifier"><value index="vDEF">EXT:kumano_kodo/Resources/Private/Forms/contact.form.yaml</value></field>' +
    '<field index="settings.overrideFinishers"><value index="vDEF">0</value></field></language></sheet></data></T3FlexForms>';

// The frame's texts live on the root page and slide down to every page, as in the full demo.
const frame = [
    { ...text(t('A short line about this site.', 'Eine kurze Zeile über diese Website.', 'このサイトについての短い紹介文。')), colPos: 20 },
    links(
        t('Pages', 'Seiten', 'ページ'),
        [
            { title: titles.about, link: 'page:about' },
            { title: titles.contact, link: 'page:contact' },
        ],
        20,
    ),
    links(
        t('© Your name', '© Ihr Name', '© お名前'),
        [
            { title: titles.imprint, link: 'page:imprint' },
            { title: titles.privacy, link: 'page:privacy' },
        ],
        22,
    ),
];

const pages = [
    page('home', null, '/', titles.home, {
        nextLayout: 'Default',
        content: [
            ...frame,
            text(
                t(
                    'This is your home page. Replace this text with an introduction to your site.',
                    'Dies ist Ihre Startseite. Ersetzen Sie diesen Text durch eine Einführung in Ihre Website.',
                    'これはあなたのホームページです。このテキストをサイトの紹介文に置き換えてください。',
                ),
            ),
        ],
    }),
    page('about', 'home', '/about', titles.about, {
        content: [
            text(
                t(
                    'Tell visitors who you are and what this site is about.',
                    'Erzählen Sie hier, wer Sie sind und worum es auf dieser Website geht.',
                    'あなたが誰で、このサイトが何についてなのかをここで紹介してください。',
                ),
            ),
        ],
    }),
    page('contact', 'home', '/contact', titles.contact, {
        content: [
            el(
                'kumano_columns',
                { tx_kumanokodo_layout: 'text-media' },
                {
                    children: {
                        201: [
                            text(t('Write to us using the form.', 'Schreiben Sie uns über das Formular.', 'フォームからご連絡ください。')),
                        ],
                        202: [el('form_formframework', { pi_flexform: formFlexform })],
                    },
                },
            ),
        ],
    }),
    page('imprint', 'home', '/imprint', titles.imprint, {
        navHide: true,
        content: [
            text(
                t(
                    'Name and address of the person responsible for this site.',
                    'Name und Anschrift der für diese Website verantwortlichen Person.',
                    'このサイトの運営責任者の氏名と住所。',
                ),
            ),
        ],
    }),
    page('privacy', 'home', '/privacy', titles.privacy, {
        navHide: true,
        content: [
            text(
                t(
                    'Which data this site collects, why, and how long it keeps it.',
                    'Welche Daten diese Website erhebt, wozu und wie lange sie gespeichert werden.',
                    'このサイトが収集するデータ、その目的と保存期間。',
                ),
            ),
        ],
    }),
];

const site = { websiteTitle: 'Your site', package: 'kumano_kodo_starter', settings: { 'kumanoKodo.theme': 'mono' } };
await writeFile(out, `${JSON.stringify({ site, photos: {}, files: {}, pages, frontendUsers: [] }, null, 4)}\n`);
console.log(`Starter: ${pages.length} pages → ${out}`);
