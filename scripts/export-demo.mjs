#!/usr/bin/env node
// Writes the TYPO3 demo from the Storybook content (en, de, ja): every page of stories/templates/site-pages.markup.ts,
// the journal home and the previous home, as content elements. `typo3 kumano:demo:build` turns it into records.

import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'typo3/Build/Demo/content.json');

const server = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true } });
const { content, locales } = await server.ssrLoadModule('/stories/templates/content.ts');
const { routes, paths, placeSlugs, practicalSlugs, legalSlugs } = await server.ssrLoadModule('/stories/content/paths.ts');
const { dayPhotos } = await server.ssrLoadModule('/stories/templates/journal-photos.ts');
await server.close();

const langs = ['en', 'de', 'ja'].filter((l) => l in locales);
const c = Object.fromEntries(langs.map((l) => [l, content(l)]));
// A translatable value: one string per language, picked from each language's content.
const t = (pick) => Object.fromEntries(langs.map((l) => [l, pick(c[l], l)]));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const paragraphs = (pick) =>
    t((x) =>
        pick(x)
            .map((p) => `<p>${esc(p)}</p>`)
            .join(''),
    );

// Pages are keyed like their stories (site--day-1 → day-1); a link becomes page:<key> plus its #anchor.
const keyOf = (href) => routes[href.split('#')[0] || '/']?.replace(/^site--/, '');
const link = (href, here = '') => {
    if (!href || href === '#') return '';
    if (/^(mailto|tel|https?):/.test(href)) return href;
    if (href.startsWith('#')) return `page:${here}${href}`;
    const key = keyOf(href);
    if (!key) throw new Error(`No page for link ${href}`);
    return `page:${key}${href.includes('#') ? `#${href.split('#')[1]}` : ''}`;
};
const photo = (image) => image?.src.match(/img\/photos\/(.+)-\d+\.jpg$/)?.[1] ?? '';

const photos = Object.fromEntries(
    Object.keys(c.en.photos).map((slug) => [
        slug,
        { file: `img/photos/${slug}-2400.jpg`, alt: t((x) => x.photos[slug].alt), caption: t((x) => x.photos[slug].caption ?? '') },
    ]),
);

// ---------- content element builders; field names are the TCA columns ----------
const el = (type, fields = {}, extra = {}) => ({ type, fields, ...extra });
const list = (pickList, map) => pickList(c.en).map((_, i) => map((x) => pickList(x)[i], i));
const section = (fields, a, b, extra = {}) => el('kumano_section', fields, { children: { a, ...(b ? { b } : {}) }, ...extra });
const text = (html, fields = {}) => el('text', { bodytext: html, ...fields });

const heading = (pick, gap) => ({
    header: t((x) => pick(x).title),
    ...(pick(c.en).eyebrow ? { subheader: t((x) => pick(x).eyebrow) } : {}),
    ...(pick(c.en).aside ? { tx_kumanokodo_aside: t((x) => pick(x).aside) } : {}),
    ...(gap ? { tx_kumanokodo_gap: String(gap) } : {}),
});

const teaserItems = (pickList) =>
    list(pickList, (p) => ({
        image: photo(p(c.en).image),
        title: t((x) => p(x).title),
        ...(p(c.en).subtitle ? { subtitle: t((x) => p(x).subtitle) } : {}),
        ...(p(c.en).meta ? { meta: t((x) => p(x).meta) } : {}),
        ...(p(c.en).badge ? { badge: t((x) => p(x).badge) } : {}),
        link: link(p(c.en).href),
    }));

const dayTeasers = (x) =>
    x.kumano.days.map((d, i) => ({
        image: x.photos[dayPhotos[i][Math.min(1, dayPhotos[i].length - 1)][0]],
        title: d.route,
        subtitle: x.site.day.distances[i],
        meta: `${d.date} · ${d.time}`,
        href: paths.day(i + 1),
    }));

const routeMap = (fields) =>
    el(
        'kumano_route_map',
        {
            ...fields,
            tx_kumanokodo_meta: t((x) => x.kumano.route.label),
            tx_kumanokodo_path: c.en.kumano.route.path,
            tx_kumanokodo_legend_walked: t((x) => x.kumano.route.legend.walked),
            tx_kumanokodo_legend_end: t((x) => x.kumano.route.legend.end),
            tx_kumanokodo_legend_boundary: t((x) => x.kumano.route.legend.boundary),
        },
        {
            items: list(
                (x) => x.kumano.route.stations,
                (s) => ({
                    title: t((x) => s(x).name),
                    x: s(c.en).x,
                    y: s(c.en).y,
                    label_y: s(c.en).labelY,
                    anchor: s(c.en).anchor ?? 'middle',
                    boundary: s(c.en).boundary ? 1 : 0,
                }),
            ),
            items2: list(
                (x) => x.kumano.route.days,
                (d) => ({ label: t((x) => d(x).label), x: d(c.en).x }),
            ),
        },
    );

const faq = (fields) =>
    el('kumano_faq', fields, {
        items: list(
            (x) => x.kumano.faq,
            (f) => ({ title: t((x) => f(x).question), text: t((x) => f(x).answer), open: f(c.en).open ? 1 : 0 }),
        ),
    });

const chapter = (i, id) =>
    el(
        'kumano_chapter',
        {
            tx_kumanokodo_anchor: id,
            tx_kumanokodo_number: String(i + 1),
            subheader: t((x) => `${x.kumano.days[i].date} · ${x.kumano.days[i].time}`),
            header: t((x) => x.kumano.days[i].route),
            bodytext: t((x) => x.home.draft.chapters[i]),
        },
        { items: dayPhotos[i].map(([name, span, shift]) => ({ image: name, span: String(span), shift: String(shift ?? 0) })) },
    );

const bleed = (name, caption) => el('kumano_bleed_photo', caption ? { bodytext: caption } : {}, { image: [name] });

const lightboxCaption = (name, pickText) => t((x) => `${pickText(x)} ${x.photos[name].caption ?? ''}`);

// ---------- pages ----------
const page = (key, parent, title, extra = {}) => ({
    key,
    parent,
    slug: Object.entries(routes).find(([, id]) => id === `site--${key}`)?.[0] ?? `/${key}`,
    layout: 'Default',
    navHide: false,
    title,
    content: [],
    ...extra,
});

const nav = (i) => t((x) => x.kumano.nav[i].menu);
const route = nav(0);
const linksOf = (pickLinks, here) =>
    pickLinks(c.en).map((_, i) => ({ label: t((x) => pickLinks(x)[i].label), link: link(pickLinks(c.en)[i].href, here) }));

const journal = [
    el('kumano_journal_opener', {
        subheader: t((x) => x.home.draft.kicker),
        header: t((x) => x.home.draft.title),
        bodytext: t((x) => x.home.draft.lede),
        tx_kumanokodo_meta: t((x) => `${x.kumano.hero.eyebrow} · ${x.home.draft.allPhotos}`),
        tx_kumanokodo_vertical: '熊野古道',
    }),
    chapter(0, 'day-1'),
    bleed('sea-of-clouds'),
    chapter(1, 'day-2'),
    el('kumano_highlight', {
        tx_kumanokodo_tone: 'sunk',
        ...(c.en.home.crow.eyebrow ? { subheader: t((x) => x.home.crow.eyebrow) } : {}),
        header: t((x) => x.home.crow.title),
        bodytext: t((x) => x.home.crow.text),
    }),
    chapter(2, 'day-3'),
    chapter(3, 'day-4'),
    bleed(
        'evening-rooftops',
        lightboxCaption('evening-rooftops', (x) => x.home.draft.coda),
    ),
    routeMap({ ...heading((x) => ({ title: x.home.draft.mapTitle, aside: x.home.map.aside }), 56) }),
    faq({ tx_kumanokodo_tone: 'sunk', header: t((x) => x.home.draft.practicalTitle) }),
    el('kumano_newsletter', { header: t((x) => x.home.newsletter.title), bodytext: t((x) => x.home.newsletter.text) }),
];

const s = (x) => x.pages.start;
const routeContent = [
    el(
        'kumano_hero_split',
        {
            header: t((x) => s(x).title),
            bodytext: t((x) => s(x).text),
            tx_kumanokodo_link: link(paths.days),
            tx_kumanokodo_link_label: t((x) => s(x).action),
            subheader: t((x) => s(x).panelTitle),
            tx_kumanokodo_link2: link(paths.days),
            tx_kumanokodo_link2_label: t((x) => s(x).panelMore),
        },
        { items: teaserItems((x) => x.guide.routes) },
    ),
    el(
        'kumano_icon_facts',
        { tx_kumanokodo_label: t((x) => s(x).factsLabel), tx_kumanokodo_columns: '4' },
        {
            items: list(
                (x) => x.guide.facts,
                (f) => ({ icon: f(c.en).icon, label: t((x) => f(x).label), value: t((x) => f(x).value), note: t((x) => f(x).note) }),
            ),
        },
    ),
    el(
        'kumano_teasers',
        { tx_kumanokodo_space: 'flush-top', header: t((x) => s(x).stages.title), tx_kumanokodo_gap: '56', tx_kumanokodo_columns: '4' },
        { items: teaserItems(dayTeasers) },
    ),
    routeMap({ tx_kumanokodo_anchor: 'map', ...heading((x) => ({ title: x.home.map.title, aside: x.home.map.aside }), 56) }),
    el(
        'kumano_cta_cards',
        { tx_kumanokodo_tone: 'sunk', header: t((x) => s(x).prep.title), tx_kumanokodo_gap: '56', tx_kumanokodo_columns: '3' },
        {
            items: list(
                (x) => x.guide.prep,
                (p) => ({
                    title: t((x) => p(x).title),
                    text: t((x) => p(x).text),
                    link: link(p(c.en).href),
                    link_label: t((x) => x.ui.readMore),
                    variant: p(c.en).variant ?? 'default',
                }),
            ),
        },
    ),
    el(
        'kumano_link_tiles',
        { header: t((x) => s(x).plan), tx_kumanokodo_gap: '40', tx_kumanokodo_columns: '2' },
        {
            items: list(
                (x) => x.guide.tiles,
                (p) => ({ icon: p(c.en).icon, title: t((x) => p(x).title), link: link(p(c.en).href) }),
            ),
        },
    ),
];

const g = (x) => x.site.days.groups;
const stays = (x) => {
    const st = x.kumano.route.stations;
    return [
        { image: x.photos['misty-valley'], title: st[1].name, meta: x.kumano.days[0].date, href: paths.day(1) },
        { image: x.photos['vending-machines'], title: st[2].name, meta: x.kumano.days[1].date, href: paths.place('chikatsuyu') },
        { image: x.photos['outdoor-bath'], title: x.guide.entries[5].title, meta: x.kumano.days[2].date, href: paths.place('yunomine') },
        { image: x.photos['ryokan-room'], title: x.guide.entries[7].title, meta: x.kumano.days[3].date, href: paths.day(4) },
    ];
};
const group = (id, pickTitle, pickItems) =>
    el(
        'kumano_teasers',
        { tx_kumanokodo_anchor: id, header: t(pickTitle), tx_kumanokodo_gap: '40', tx_kumanokodo_columns: '4' },
        { items: teaserItems(pickItems) },
    );
const daysContent = [
    text(t((x) => `<p>${esc(x.site.days.intro)}</p>`)),
    group('days', (x) => g(x).days, dayTeasers),
    group(
        'places',
        (x) => g(x).places,
        (x) => x.guide.entries.slice(4, 7),
    ),
    group('stays', (x) => g(x).stays, stays),
];
const daysChips = [
    { link_label: t((x) => x.pages.list.chips[0]), link: 'page:days#days', active: 1 },
    { link_label: t((x) => g(x).days), link: 'page:days#days' },
    { link_label: t((x) => g(x).places), link: 'page:days#places' },
    { link_label: t((x) => g(x).stays), link: 'page:days#stays' },
];

const photosOfDay = (i) => [...(i === 1 ? ['sea-of-clouds'] : []), ...dayPhotos[i].map(([name]) => name)];
const dayContent = (n) => {
    const i = n - 1;
    const names = photosOfDay(i);
    const d = (x) => x.kumano.days[i];
    const sd = (x) => x.site.day;
    return [
        section(
            { tx_kumanokodo_layout: 'content-sidebar' },
            [
                el('kumano_figure', { tx_kumanokodo_rule: 0 }, { image: [names[0]] }),
                text(t((x) => `<p>${esc(x.home.draft.chapters[i])}</p><p>${esc(d(x).description)}</p>`)),
            ],
            [
                el(
                    'kumano_fact_list',
                    { header: t((x) => sd(x).factsTitle), tx_kumanokodo_variant: 'inline' },
                    {
                        items: [
                            { label: t((x) => sd(x).facts.date), value: t((x) => d(x).date) },
                            { label: t((x) => sd(x).facts.route), value: t((x) => d(x).route) },
                            { label: t((x) => sd(x).facts.distance), value: t((x) => sd(x).distances[i]) },
                            { label: t((x) => sd(x).facts.photos), value: t((x) => d(x).time) },
                        ],
                    },
                ),
                el(
                    'kumano_info_box',
                    { header: t((x) => sd(x).tipTitle), bodytext: t((x) => sd(x).tips[i]) },
                    { links: [{ label: t((x) => x.site.practical.title), link: link(paths.practical) }] },
                ),
                el(
                    'kumano_sub_nav',
                    { header: t((x) => g(x).days) },
                    {
                        links: [0, 1, 2, 3].map((k) => ({
                            label: t((x) => `${x.kumano.days[k].date.split(' · ')[0]} · ${x.kumano.days[k].route}`),
                            link: `page:day-${k + 1}`,
                        })),
                    },
                ),
            ],
        ),
        el(
            'kumano_gallery',
            { tx_kumanokodo_tone: 'sunk', header: t((x) => sd(x).photos), tx_kumanokodo_gap: '40' },
            { image: names.slice(1) },
        ),
        el(
            'kumano_links',
            { tx_kumanokodo_variant: 'cluster' },
            {
                items: [
                    ...(n > 1 ? [{ link_label: t((x) => sd(x).previous), link: `page:day-${n - 1}`, direction: 'back' }] : []),
                    ...(n < 4 ? [{ link_label: t((x) => sd(x).next), link: `page:day-${n + 1}`, direction: 'forward' }] : []),
                ],
            },
        ),
    ];
};

const placeContent = (slug) => {
    const p = (x) => x.site.places[slug];
    const day = c.en.site.places[slug].day;
    return [
        section(
            { tx_kumanokodo_layout: 'content-sidebar' },
            [text(paragraphs((x) => p(x).text)), el('kumano_gallery', {}, { image: [...c.en.site.places[slug].photos] })],
            [
                el(
                    'kumano_links',
                    { tx_kumanokodo_variant: 'stack' },
                    {
                        items: [
                            {
                                link_label: t((x) => `${x.kumano.days[day - 1].date}: ${x.kumano.days[day - 1].route}`),
                                link: `page:day-${day}`,
                                direction: 'forward',
                            },
                            { link_label: t((x) => x.site.days.title), link: 'page:days', direction: 'back' },
                        ],
                    },
                ),
            ],
        ),
    ];
};

const practicalContent = [
    text(t((x) => `<p>${esc(x.site.practical.intro)}</p>`)),
    el(
        'kumano_link_tiles',
        { tx_kumanokodo_space: 'flush-top', tx_kumanokodo_columns: '2' },
        {
            items: list(
                (x) => x.guide.tiles,
                (p) => ({ icon: p(c.en).icon, title: t((x) => p(x).title), link: link(p(c.en).href) }),
            ),
        },
    ),
    faq({ tx_kumanokodo_tone: 'sunk', header: t((x) => x.home.practical.title) }),
];

const practicalSubContent = (slug) => [
    section(
        { tx_kumanokodo_layout: 'content-sidebar' },
        [
            text(paragraphs((x) => x.site.practical.pages[slug].text)),
            ...(slug === 'maps'
                ? [
                      el(
                          'kumano_downloads',
                          {},
                          {
                              items: list(
                                  (x) => x.pages.detail.downloads,
                                  (d) => ({ title: t((x) => d(x).title), meta: t((x) => d(x).meta), link: link(d(c.en).href) }),
                              ),
                          },
                      ),
                  ]
                : []),
        ],
        [
            el(
                'kumano_sub_nav',
                { header: t((x) => x.site.practical.title) },
                {
                    links: practicalSlugs.map((p) => ({ label: t((x) => x.site.practical.pages[p].title), link: `page:practical-${p}` })),
                },
            ),
        ],
    ),
];

const photosContent = [
    text(t((x) => `<p>${esc(x.site.photos.intro)}</p>`)),
    ...dayPhotos.map((_, i) => chapter(i, `photos-day-${i + 1}`)),
    bleed('sea-of-clouds'),
    bleed(
        'evening-rooftops',
        lightboxCaption('evening-rooftops', (x) => x.home.draft.coda),
    ),
];

const textPage = (pickText, after = []) => [section({}, [text(paragraphs(pickText)), ...after])];

const v3 = [
    el(
        'kumano_hero',
        {
            subheader: t((x) => x.kumano.hero.eyebrow),
            tx_kumanokodo_heading: t((x) => x.kumano.hero.title),
            bodytext: t((x) => x.kumano.hero.teaser),
        },
        {
            image: [photo(c.en.kumano.hero.image)],
            items: list(
                (x) => x.kumano.hero.actions,
                (a) => ({ link_label: t((x) => a(x).label), link: link(a(c.en).href, 'home-v3') }),
            ),
            items2: list(
                (x) => x.kumano.hero.stats,
                (a) => ({ label: t((x) => a(x).label), value: t((x) => a(x).value) }),
            ),
        },
    ),
    section(
        { ...heading((x) => x.home.why, 64), tx_kumanokodo_layout: 'text-media' },
        [text(t((x) => x.kumano.intro.map((p) => `<p>${p}</p>`).join('')))],
        [el('kumano_figure', { bodytext: t((x) => x.home.bridgeCaption) }, { image: ['forest-stream'] })],
    ),
    el('kumano_highlight', {
        tx_kumanokodo_tone: 'sunk',
        ...(c.en.home.crow.eyebrow ? { subheader: t((x) => x.home.crow.eyebrow) } : {}),
        header: t((x) => x.home.crow.title),
        bodytext: t((x) => x.home.crow.text),
    }),
    el('kumano_quote', { tx_kumanokodo_space: 'large', bodytext: t((x) => x.home.quote.quote), subheader: t((x) => x.home.quote.source) }),
    section({ tx_kumanokodo_space: 'flush-top', tx_kumanokodo_column_gap: '96' }, [
        el(
            'kumano_stats',
            {},
            {
                items: list(
                    (x) => x.kumano.stats,
                    (a) => ({ value: t((x) => a(x).value), label: t((x) => a(x).label) }),
                ),
            },
        ),
        el(
            'kumano_day_list',
            { ...heading((x) => x.home.days, 56) },
            {
                items: list(
                    (x) => x.kumano.days,
                    (d) => ({
                        label: t((x) => d(x).date),
                        title: t((x) => d(x).route),
                        text: t((x) => d(x).description),
                        meta: t((x) => d(x).time),
                    }),
                ),
            },
        ),
    ]),
    el(
        'kumano_slider',
        {
            tx_kumanokodo_tone: 'sunk',
            tx_kumanokodo_bleed: 1,
            tx_kumanokodo_label: t((x) => x.home.stages.eyebrow),
            tx_kumanokodo_anchor: 'stages',
            header: t((x) => x.home.stages.title),
            subheader: t((x) => x.home.stages.eyebrow),
        },
        {
            items: list(
                (x) => x.kumano.stages,
                (st) => ({
                    image: photo(st(c.en).image),
                    label: t((x) => st(x).stage),
                    meta: t((x) => st(x).stats),
                    title: t((x) => st(x).title),
                    text: t((x) => st(x).description),
                }),
            ),
        },
    ),
    routeMap({ ...heading((x) => x.home.map, 56) }),
    section({ tx_kumanokodo_space: 'flush-top', ...heading((x) => x.home.places, 64), tx_kumanokodo_column_gap: '64' }, [
        section({ tx_kumanokodo_layout: 'wide-narrow' }, [placeCard(0)], [placeCard(1)]),
        section(
            { tx_kumanokodo_layout: 'narrow-wide' },
            [placeCard(2)],
            [el('kumano_figure', { bodytext: t((x) => x.home.roadsideCaption) }, { image: ['land-crab', 'cedar-canopy'] })],
        ),
    ]),
    faq({
        tx_kumanokodo_anchor: 'faq',
        tx_kumanokodo_tone: 'sunk',
        subheader: t((x) => x.home.practical.eyebrow),
        header: t((x) => x.home.practical.title),
        bodytext: t((x) => x.home.practical.intro),
    }),
    el('kumano_newsletter', { header: t((x) => x.home.newsletter.title), bodytext: t((x) => x.home.newsletter.text) }),
];
function placeCard(i) {
    const p = (x) => x.kumano.places[i];
    return el(
        'kumano_place_card',
        { header: t((x) => p(x).title), bodytext: t((x) => p(x).description), tx_kumanokodo_variant: p(c.en).variant ?? 'default' },
        { image: [photo(p(c.en).image)] },
    );
}

// Components no page uses, with the sample data of their stories, so every element is in the demo.
const components = [
    el(
        'kumano_section_heading',
        heading((x) => x.home.map),
    ),
    el(
        'kumano_text_media',
        {
            header: t((x) => x.kumano.places[1].title),
            bodytext: t((x) => x.kumano.places[1].description),
            tx_kumanokodo_link: 'page:route',
            tx_kumanokodo_link_label: t((x) => x.ui.readMore),
            tx_kumanokodo_variant: 'left',
        },
        { image: [photo(c.en.kumano.places[1].image)] },
    ),
    section(
        { tx_kumanokodo_layout: 'even' },
        [
            el(
                'kumano_media_list',
                {
                    header: t((x) => x.pages.start.panelTitle),
                    tx_kumanokodo_link: 'page:days',
                    tx_kumanokodo_link_label: t((x) => x.pages.start.panelMore),
                },
                { items: teaserItems((x) => x.guide.routes) },
            ),
        ],
        [
            el('kumano_table', {
                header: t((x) => x.samples.table.caption),
                bodytext: t((x) => [x.samples.table.head, ...x.samples.table.rows].map((r) => r.join('|')).join('\n')),
            }),
        ],
    ),
    el(
        'kumano_persons',
        { tx_kumanokodo_columns: '4' },
        {
            items: list(
                (x) => x.guide.hosts,
                (h) => ({
                    image: photo(h(c.en).image),
                    title: t((x) => h(x).name),
                    subtitle: t((x) => h(x).role),
                    text: t((x) => h(x).focus),
                }),
            ),
        },
    ),
];

const pages = [
    page(
        'home',
        null,
        t((x) => x.site.home),
        { layout: 'Journal', nextLayout: 'Default', content: journal },
    ),
    page(
        'route',
        'home',
        t((x) => x.kumano.nav[0].label),
        {
            layout: 'Landing',
            content: routeContent,
            flyout: {
                kind: 'mega',
                columns: route.en.columns.map((col, i) => ({
                    title: t((_, l) => route[l].columns[i].title),
                    links: linksOf((x) => x.kumano.nav[0].menu.columns[i].links),
                })),
                text: { title: t((_, l) => route[l].text.title), html: t((_, l) => route[l].text.html) },
                overview: { label: t((_, l) => route[l].overview.label), link: link(route.en.overview.href) },
                teaser: {
                    image: photo(route.en.teaser.image),
                    title: t((_, l) => route[l].teaser.title),
                    subtitle: t((_, l) => route[l].teaser.subtitle),
                    meta: t((_, l) => route[l].teaser.meta),
                    badge: t((_, l) => route[l].teaser.badge),
                    link: link(route.en.teaser.href),
                },
            },
        },
    ),
    page(
        'days',
        'route',
        t((x) => x.site.days.title),
        { navHide: true, content: daysContent, chips: daysChips },
    ),
    ...[1, 2, 3, 4].map((n) =>
        page(
            `day-${n}`,
            'days',
            t((x) => x.kumano.days[n - 1].route),
            { content: dayContent(n) },
        ),
    ),
    ...placeSlugs.map((slug) =>
        page(
            `place-${slug}`,
            'days',
            t((x) => x.site.places[slug].title),
            { content: placeContent(slug) },
        ),
    ),
    page(
        'kohechi',
        'route',
        t((x) => x.site.kohechi.title),
        {
            navHide: true,
            content: textPage(
                (x) => x.site.kohechi.text,
                [
                    el(
                        'kumano_links',
                        { tx_kumanokodo_variant: 'plain' },
                        { items: [{ link_label: t((x) => x.site.route.title), link: 'page:route', direction: 'back' }] },
                    ),
                ],
            ),
        },
    ),
    page(
        'practical',
        'home',
        t((x) => x.kumano.nav[1].label),
        {
            content: practicalContent,
            flyout: { kind: 'dropdown', columns: [{ title: t(() => ''), links: linksOf((x) => x.kumano.nav[1].menu.links) }] },
        },
    ),
    ...practicalSlugs.map((slug) =>
        page(
            `practical-${slug}`,
            'practical',
            t((x) => x.site.practical.pages[slug].title),
            { content: practicalSubContent(slug) },
        ),
    ),
    page(
        'photos',
        'home',
        t((x) => x.kumano.nav[2].label),
        { content: photosContent },
    ),
    page(
        'newsletter',
        'home',
        t((x) => x.site.newsletter.title),
        {
            navHide: true,
            content: [el('kumano_newsletter', { bodytext: t((x) => x.site.newsletter.intro) })],
        },
    ),
    ...legalSlugs.map((slug) =>
        page(
            slug,
            'home',
            t((x) => x.site.legal[slug].title),
            { navHide: true, content: textPage((x) => x.site.legal[slug].text) },
        ),
    ),
    page(
        'home-v3',
        'home',
        t(() => 'Home v3'),
        { navHide: true, layout: 'Classic', content: v3 },
    ),
    page(
        'components',
        'home',
        t(() => 'Components'),
        { navHide: true, content: components },
    ),
];

// The frame's texts live on the root page and slide down to every page.
const footer = (x) => x.guide.footer;
const frame = [
    el('header', { header: t((x) => x.guide.topbar.label), subheader: t((x) => x.guide.topbar.value) }, { colPos: 30 }),
    el('text', { bodytext: t((x) => `<p>${footer(x).about}</p>`) }, { colPos: 20 }),
    ...footer(c.en).columns.map((col, i) =>
        el(
            'kumano_link_list',
            { header: t((x) => footer(x).columns[i].title) },
            { colPos: 20, links: linksOf((x) => footer(x).columns[i].links) },
        ),
    ),
    el('kumano_notice', { header: t((x) => footer(x).notice.title), bodytext: t((x) => footer(x).notice.text) }, { colPos: 21 }),
    el('kumano_link_list', { header: t((x) => footer(x).copyright) }, { colPos: 22, links: linksOf((x) => footer(x).legal) }),
];
pages[0].content = [...frame, ...pages[0].content];

const site = {
    settings: {
        'kumanoKodo.contact.phone': c.en.guide.topbar.phone,
        'kumanoKodo.contact.email': c.en.guide.topbar.email,
    },
};

const count = (elements) => elements.reduce((n, e) => n + 1 + count(Object.values(e.children ?? {}).flat()), 0);
await writeFile(out, `${JSON.stringify({ site, photos, pages }, null, 4)}\n`);
console.log(
    `Demo: ${pages.length} pages, ${count(pages.flatMap((p) => p.content))} content elements, ${Object.keys(photos).length} photos → ${out}`,
);
