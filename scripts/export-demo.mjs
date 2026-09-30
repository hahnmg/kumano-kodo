#!/usr/bin/env node
// Writes the TYPO3 demo's page tree and content from the Storybook content modules (en, de, ja).
// `typo3 kumano:demo:build` turns the JSON into records; the export of those records ships as data.xml.

import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'typo3/Build/Demo/content.json');

const server = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true } });
const { content, locales } = await server.ssrLoadModule('/stories/templates/content.ts');
const { routes, placeSlugs, practicalSlugs, legalSlugs } = await server.ssrLoadModule('/stories/content/paths.ts');
await server.close();

const langs = ['en', 'de', 'ja'].filter((l) => l in locales);
const c = Object.fromEntries(langs.map((l) => [l, content(l)]));
const each = (pick) => Object.fromEntries(langs.map((l) => [l, pick(c[l], l)]));

// Pages are keyed like their stories (site--day-1 → day-1); a link becomes page:<key> plus its #anchor.
const keyOf = (href) => routes[href.split('#')[0] || '/']?.replace(/^site--/, '');
const link = (href) => {
    if (!href || href === '#') return '';
    if (/^(mailto|tel|https?):/.test(href)) return href;
    const key = keyOf(href);
    if (!key) throw new Error(`No page for link ${href}`);
    const hash = href.includes('#') ? `#${href.split('#')[1]}` : '';
    return `page:${key}${hash}`;
};
const photoOf = (image) => image?.src.match(/img\/photos\/(.+)-\d+\.jpg$/)?.[1] ?? '';

const photos = Object.fromEntries(
    Object.keys(c.en.photos).map((slug) => [slug, { file: `img/photos/${slug}-2400.jpg`, alt: each((x) => x.photos[slug].alt) }]),
);

const page = (key, parent, title, extra = {}) => ({
    key,
    parent,
    slug: Object.entries(routes).find(([, id]) => id === `site--${key}`)[0],
    layout: 'Default',
    navHide: false,
    title,
    ...extra,
});

const nav = (i) => each((x) => x.kumano.nav[i].menu);
const route = nav(0);
const linksOf = (pickLinks) =>
    pickLinks(c.en).map((_, i) => ({ label: each((x) => pickLinks(x)[i].label), link: link(pickLinks(c.en)[i].href) }));

const pages = [
    page(
        'home',
        null,
        each((x) => x.site.home),
        { layout: 'Landing', nextLayout: 'Default' },
    ),
    page(
        'route',
        'home',
        each((x) => x.kumano.nav[0].label),
        {
            layout: 'Landing',
            flyout: {
                kind: 'mega',
                columns: route.en.columns.map((col, i) => ({
                    title: each((_, l) => route[l].columns[i].title),
                    links: linksOf((x) => x.kumano.nav[0].menu.columns[i].links),
                })),
                text: { title: each((_, l) => route[l].text.title), html: each((_, l) => route[l].text.html) },
                overview: { label: each((_, l) => route[l].overview.label), link: link(route.en.overview.href) },
                teaser: {
                    image: photoOf(route.en.teaser.image),
                    title: each((_, l) => route[l].teaser.title),
                    subtitle: each((_, l) => route[l].teaser.subtitle),
                    meta: each((_, l) => route[l].teaser.meta),
                    badge: each((_, l) => route[l].teaser.badge),
                    link: link(route.en.teaser.href),
                },
            },
        },
    ),
    page(
        'days',
        'route',
        each((x) => x.site.days.title),
        { navHide: true },
    ),
    ...[1, 2, 3, 4].map((n) =>
        page(
            `day-${n}`,
            'days',
            each((x) => x.kumano.days[n - 1].route),
        ),
    ),
    ...placeSlugs.map((s) =>
        page(
            `place-${s}`,
            'days',
            each((x) => x.site.places[s].title),
        ),
    ),
    page(
        'kohechi',
        'route',
        each((x) => x.site.kohechi.title),
        { navHide: true },
    ),
    page(
        'practical',
        'home',
        each((x) => x.kumano.nav[1].label),
        {
            flyout: { kind: 'dropdown', columns: [{ title: each(() => ''), links: linksOf((x) => x.kumano.nav[1].menu.links) }] },
        },
    ),
    ...practicalSlugs.map((s) =>
        page(
            `practical-${s}`,
            'practical',
            each((x) => x.site.practical.pages[s].title),
        ),
    ),
    page(
        'photos',
        'home',
        each((x) => x.kumano.nav[2].label),
    ),
    page(
        'newsletter',
        'home',
        each((x) => x.site.newsletter.title),
        { navHide: true },
    ),
    ...legalSlugs.map((s) =>
        page(
            s,
            'home',
            each((x) => x.site.legal[s].title),
            { navHide: true },
        ),
    ),
];

// The frame's texts live on the root page and slide down to every page.
const footer = (x) => x.guide.footer;
const chrome = [
    { page: 'home', colPos: 30, type: 'header', header: each((x) => x.guide.topbar.label), subheader: each((x) => x.guide.topbar.value) },
    { page: 'home', colPos: 20, type: 'text', bodytext: each((x) => `<p>${footer(x).about}</p>`) },
    ...footer(c.en).columns.map((col, i) => ({
        page: 'home',
        colPos: 20,
        type: 'kumano_link_list',
        header: each((x) => footer(x).columns[i].title),
        links: linksOf((x) => footer(x).columns[i].links),
    })),
    {
        page: 'home',
        colPos: 21,
        type: 'kumano_notice',
        header: each((x) => footer(x).notice.title),
        bodytext: each((x) => footer(x).notice.text),
    },
    {
        page: 'home',
        colPos: 22,
        type: 'kumano_link_list',
        header: each((x) => footer(x).copyright),
        links: linksOf((x) => footer(x).legal),
    },
];

const site = {
    languages: langs.map((l) => ({ code: l, navigationTitle: l.toUpperCase() })),
    settings: {
        'kumanoKodo.contact.phone': c.en.guide.topbar.phone,
        'kumanoKodo.contact.email': c.en.guide.topbar.email,
    },
};

await writeFile(out, `${JSON.stringify({ site, photos, pages, content: chrome }, null, 4)}\n`);
console.log(`Demo: ${pages.length} pages, ${chrome.length} content elements, ${Object.keys(photos).length} photos → ${out}`);
