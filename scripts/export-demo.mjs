#!/usr/bin/env node
// Writes the TYPO3 demo from the Storybook content (en, de, ja): every site page, the journal home, the previous home
// and a page of the remaining components. `typo3 kumano:demo:build` turns it into records.

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
const { demoLogin } = await server.ssrLoadModule('/stories/content/demo-login.ts');
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

// Downloads are files of their own language; title, type and size come from the file in TYPO3.
const fileSlug = (href) =>
    href
        .split('/')
        .pop()
        .replace(/\.pdf$/, '');
const files = Object.fromEntries(
    langs.flatMap((l) => c[l].pages.detail.downloads.map((d) => [fileSlug(d.href), { file: d.href.slice(1), title: d.title }])),
);

const photos = Object.fromEntries(
    Object.keys(c.en.photos).map((slug) => [
        slug,
        { file: `img/photos/${slug}-2400.jpg`, alt: t((x) => x.photos[slug].alt), caption: t((x) => x.photos[slug].caption ?? '') },
    ]),
);

// ---------- elements; field names are the TCA columns ----------
// Rich text of the own elements: a plain value becomes one paragraph.
const asParagraph = (v) => (typeof v === 'string' && !v.startsWith('<') ? `<p>${esc(v)}</p>` : v);
const richText = (v) =>
    v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([l, x]) => [l, asParagraph(x)])) : asParagraph(v);
const el = (type, fields = {}, extra = {}) => ({
    type,
    fields: type.startsWith('kumano_') && fields.bodytext ? { ...fields, bodytext: richText(fields.bodytext) } : fields,
    ...extra,
});
// Buttons and the link below a list are entries of the element's Links.
const links = (...items) => ({ tx_kumanokodo_links: items });
const list = (pickList, map) => pickList(c.en).map((_, i) => map((x) => pickList(x)[i], i));
const section = (fields, children) => el('kumano_section', fields, { children: { 201: children } });
const columns = (layout, fields, first, second) =>
    el('kumano_columns', { tx_kumanokodo_layout: layout, ...fields }, { children: { 201: first, 202: second } });
const text = (html, fields = {}) => el('text', { bodytext: html, ...fields });
const sunk = { frame_class: 'sunk' };

const heading = (pick) => ({
    header: t((x) => pick(x).title),
    ...(pick(c.en).eyebrow ? { subheader: t((x) => pick(x).eyebrow) } : {}),
    ...(pick(c.en).aside ? { tx_kumanokodo_aside: t((x) => pick(x).aside) } : {}),
});
const hiddenHeading = (pick) => ({ header: t(pick), header_layout: '100' });

const cards = (style, shownAs, fields, items) =>
    el(
        'kumano_cards',
        { tx_kumanokodo_variant: style, tx_kumanokodo_columns: String(shownAs), ...fields },
        { items: { tx_kumanokodo_entries: items } },
    );
const listEl = (variant, fields, items, more = []) =>
    el('kumano_list', { tx_kumanokodo_variant: variant, ...fields }, { items: { tx_kumanokodo_entries: items, ...links(...more) } });
const facts = (variant, fields, items) =>
    el('kumano_facts', { tx_kumanokodo_variant: variant, ...fields }, { items: { tx_kumanokodo_facts: items } });
const images = (variant, names, fields = {}) => el('kumano_images', { tx_kumanokodo_variant: variant, ...fields }, { image: names });

const teasers = (pickList) =>
    list(pickList, (p) => ({
        image: photo(p(c.en).image),
        title: t((x) => p(x).title),
        ...(p(c.en).subtitle ? { text: t((x) => p(x).subtitle) } : {}),
        ...(p(c.en).meta ? { meta: t((x) => p(x).meta) } : {}),
        ...(p(c.en).badge ? { badge: t((x) => p(x).badge) } : {}),
        link: link(p(c.en).href),
    }));
const mediaItems = (pickList) =>
    list(pickList, (p) => ({
        image: photo(p(c.en).image),
        title: t((x) => p(x).title),
        meta: t((x) => p(x).meta),
        link: link(p(c.en).href),
    }));
const linkItems = (pickList, here) => list(pickList, (p) => ({ title: t((x) => p(x).label), link: link(p(c.en).href, here) }));

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
            bodytext: t((x) => x.kumano.route.label),
            tx_kumanokodo_path: c.en.kumano.route.path,
        },
        {
            items: {
                tx_kumanokodo_stations: list(
                    (x) => x.kumano.route.stations,
                    (s) => ({
                        name: t((x) => s(x).name),
                        x: s(c.en).x,
                        y: s(c.en).y,
                        label_y: s(c.en).labelY,
                        anchor: s(c.en).anchor ?? 'middle',
                        boundary: s(c.en).boundary ? 1 : 0,
                    }),
                ),
                tx_kumanokodo_day_marks: list(
                    (x) => x.kumano.route.days,
                    (d) => ({ label: t((x) => d(x).label), x: d(c.en).x }),
                ),
            },
        },
    );

const questions = (fields) =>
    el('kumano_questions', fields, {
        items: {
            tx_kumanokodo_questions: list(
                (x) => x.kumano.faq,
                (f) => ({ question: t((x) => f(x).question), answer: t((x) => f(x).answer), open: f(c.en).open ? 1 : 0 }),
            ),
        },
    });

const chapter = (i, id) =>
    el(
        'kumano_chapter',
        {
            tx_kumanokodo_anchor: id,
            subheader: t((x) => `${x.kumano.days[i].date} · ${x.kumano.days[i].time}`),
            header: t((x) => x.kumano.days[i].route),
            bodytext: t((x) => x.home.draft.chapters[i]),
        },
        { image: dayPhotos[i].map(([name, span, shift]) => ({ photo: name, tx_kumanokodo_span: span, tx_kumanokodo_shift: shift ?? 0 })) },
    );

const coda = t((x) => `${x.home.draft.coda} ${x.photos['evening-rooftops'].caption ?? ''}`);
const highlight = () =>
    el('kumano_callout', {
        tx_kumanokodo_variant: 'highlight',
        ...sunk,
        ...(c.en.home.crow.eyebrow ? { subheader: t((x) => x.home.crow.eyebrow) } : {}),
        header: t((x) => x.home.crow.title),
        bodytext: t((x) => x.home.crow.text),
    });

// ---------- pages ----------
const journal = [
    el('kumano_page_top', {
        tx_kumanokodo_variant: 'opener',
        subheader: t((x) => x.home.draft.kicker),
        header: t((x) => x.home.draft.title),
        bodytext: t((x) => x.home.draft.lede),
        tx_kumanokodo_meta: t((x) => `${x.kumano.hero.eyebrow} · ${x.home.draft.allPhotos}`),
    }),
    chapter(0, 'day-1'),
    images('fullwidth', ['sea-of-clouds']),
    chapter(1, 'day-2'),
    highlight(),
    chapter(2, 'day-3'),
    chapter(3, 'day-4'),
    images('fullwidth', ['evening-rooftops'], { bodytext: coda }),
    routeMap(heading((x) => ({ title: x.home.draft.mapTitle, aside: x.home.map.aside }))),
    questions({ ...sunk, header: t((x) => x.home.draft.practicalTitle) }),
    el('kumano_newsletter', { header: t((x) => x.home.newsletter.title), bodytext: t((x) => x.home.newsletter.text) }),
];

const s = (x) => x.pages.start;
const tiles = (fields) =>
    cards(
        'tile',
        2,
        fields,
        list(
            (x) => x.guide.tiles,
            (p) => ({ icon: p(c.en).icon, title: t((x) => p(x).title), link: link(p(c.en).href) }),
        ),
    );
const routeContent = [
    columns(
        'hero',
        {},
        [
            el(
                'kumano_page_top',
                { tx_kumanokodo_variant: 'text', header: t((x) => s(x).title), bodytext: t((x) => s(x).text) },
                { items: links({ title: t((x) => s(x).action), link: link(paths.days) }) },
            ),
        ],
        [
            listEl(
                'media',
                { header: t((x) => s(x).panelTitle) },
                mediaItems((x) => x.guide.routes),
                [{ title: t((x) => s(x).panelMore), link: link(paths.days) }],
            ),
        ],
    ),
    facts(
        'icons',
        { ...hiddenHeading((x) => s(x).factsLabel), tx_kumanokodo_columns: '4' },
        list(
            (x) => x.guide.facts,
            (f) => ({ icon: f(c.en).icon, label: t((x) => f(x).label), value: t((x) => f(x).value), note: t((x) => f(x).note) }),
        ),
    ),
    cards('teaser', 4, { space_before_class: 'flush-top', header: t((x) => s(x).stages.title) }, teasers(dayTeasers)),
    routeMap({ tx_kumanokodo_anchor: 'map', ...heading((x) => ({ title: x.home.map.title, aside: x.home.map.aside })) }),
    cards(
        'cta',
        3,
        { ...sunk, header: t((x) => s(x).prep.title) },
        list(
            (x) => x.guide.prep,
            (p) => ({
                title: t((x) => p(x).title),
                text: t((x) => p(x).text),
                link: link(p(c.en).href),
                link_label: t((x) => x.ui.readMore),
                emphasis: p(c.en).variant ?? 'default',
            }),
        ),
    ),
    tiles({ header: t((x) => s(x).plan) }),
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
const group = (id, pickTitle, pickItems) => cards('teaser', 4, { tx_kumanokodo_anchor: id, header: t(pickTitle) }, teasers(pickItems));
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
    { title: t((x) => x.pages.list.chips[0]), link: 'page:days#days', active: 1 },
    { title: t((x) => g(x).days), link: 'page:days#days' },
    { title: t((x) => g(x).places), link: 'page:days#places' },
    { title: t((x) => g(x).stays), link: 'page:days#stays' },
];

const photosOfDay = (i) => [...(i === 1 ? ['sea-of-clouds'] : []), ...dayPhotos[i].map(([name]) => name)];
const dayContent = (n) => {
    const i = n - 1;
    const names = photosOfDay(i);
    const d = (x) => x.kumano.days[i];
    const sd = (x) => x.site.day;
    return [
        columns(
            'content-sidebar',
            {},
            [images('figure-plain', [names[0]]), text(t((x) => `<p>${esc(x.home.draft.chapters[i])}</p><p>${esc(d(x).description)}</p>`))],
            [
                facts('pairs', { header: t((x) => sd(x).factsTitle) }, [
                    { label: t((x) => sd(x).facts.date), value: t((x) => d(x).date) },
                    { label: t((x) => sd(x).facts.route), value: t((x) => d(x).route) },
                    { label: t((x) => sd(x).facts.distance), value: t((x) => sd(x).distances[i]) },
                    { label: t((x) => sd(x).facts.photos), value: t((x) => d(x).time) },
                ]),
                el(
                    'kumano_callout',
                    { tx_kumanokodo_variant: 'infobox', header: t((x) => sd(x).tipTitle), bodytext: t((x) => sd(x).tips[i]) },
                    { items: links({ title: t((x) => x.site.practical.title), link: link(paths.practical) }) },
                ),
                listEl(
                    'subnav',
                    { header: t((x) => g(x).days) },
                    [0, 1, 2, 3].map((k) => ({
                        title: t((x) => `${x.kumano.days[k].date.split(' · ')[0]} · ${x.kumano.days[k].route}`),
                        link: `page:day-${k + 1}`,
                    })),
                ),
            ],
        ),
        images('gallery', names.slice(1), { ...sunk, header: t((x) => sd(x).photos) }),
        listEl('links', {}, [
            ...(n > 1 ? [{ title: t((x) => sd(x).previous), link: `page:day-${n - 1}`, direction: 'back' }] : []),
            ...(n < 4 ? [{ title: t((x) => sd(x).next), link: `page:day-${n + 1}`, direction: 'forward' }] : []),
        ]),
    ];
};

const placeContent = (slug) => {
    const p = (x) => x.site.places[slug];
    const day = c.en.site.places[slug].day;
    return [
        columns(
            'content-sidebar',
            {},
            [text(paragraphs((x) => p(x).text)), images('gallery', [...c.en.site.places[slug].photos])],
            [
                listEl('links-stacked', {}, [
                    {
                        title: t((x) => `${x.kumano.days[day - 1].date}: ${x.kumano.days[day - 1].route}`),
                        link: `page:day-${day}`,
                        direction: 'forward',
                    },
                    { title: t((x) => x.site.days.title), link: 'page:days', direction: 'back' },
                ]),
            ],
        ),
    ];
};

const practicalContent = [
    text(t((x) => `<p>${esc(x.site.practical.intro)}</p>`)),
    tiles({ space_before_class: 'flush-top' }),
    questions({ ...sunk, header: t((x) => x.home.practical.title) }),
];

const practicalSubContent = (slug) => [
    columns(
        'content-sidebar',
        {},
        [
            text(paragraphs((x) => x.site.practical.pages[slug].text)),
            ...(slug === 'maps'
                ? [
                      el(
                          'kumano_list',
                          { tx_kumanokodo_variant: 'downloads' },
                          { media: t((x) => x.pages.detail.downloads.map((d) => fileSlug(d.href))) },
                      ),
                  ]
                : []),
        ],
        [
            listEl(
                'subnav',
                { header: t((x) => x.site.practical.title) },
                practicalSlugs.map((p) => ({ title: t((x) => x.site.practical.pages[p].title), link: `page:practical-${p}` })),
            ),
        ],
    ),
];

const photosContent = [
    text(t((x) => `<p>${esc(x.site.photos.intro)}</p>`)),
    ...dayPhotos.map((_, i) => chapter(i, `photos-day-${i + 1}`)),
    images('fullwidth', ['sea-of-clouds']),
    images('fullwidth', ['evening-rooftops'], { bodytext: coda }),
];

const textPage = (pickText, after = []) => [section({}, [text(paragraphs(pickText)), ...after])];

const place = (i) => {
    const p = (x) => x.kumano.places[i];
    return cards('place', 2, {}, [
        {
            image: photo(p(c.en).image),
            title: t((x) => p(x).title),
            text: t((x) => p(x).description),
            emphasis: p(c.en).variant ?? 'default',
        },
    ]);
};
const v3 = [
    el(
        'kumano_page_top',
        {
            tx_kumanokodo_variant: 'hero',
            subheader: t((x) => x.kumano.hero.eyebrow),
            header: t((x) => x.kumano.hero.title),
            bodytext: t((x) => x.kumano.hero.teaser),
        },
        {
            image: [photo(c.en.kumano.hero.image)],
            items: {
                tx_kumanokodo_links: list(
                    (x) => x.kumano.hero.actions,
                    (a) => ({ title: t((x) => a(x).label), link: link(a(c.en).href, 'home-v3') }),
                ),
                tx_kumanokodo_facts: list(
                    (x) => x.kumano.hero.stats,
                    (a) => ({ label: t((x) => a(x).label), value: t((x) => a(x).value) }),
                ),
            },
        },
    ),
    columns(
        'text-media',
        heading((x) => x.home.why),
        [text(t((x) => x.kumano.intro.map((p) => `<p>${p}</p>`).join('')))],
        [images('figure', ['forest-stream'], { bodytext: t((x) => x.home.bridgeCaption) })],
    ),
    highlight(),
    el('kumano_callout', {
        tx_kumanokodo_variant: 'quote',
        space_before_class: 'large',
        bodytext: t((x) => x.home.quote.quote),
        header: t((x) => x.home.quote.source),
    }),
    section({ space_before_class: 'flush-top' }, [
        facts(
            'figures',
            {},
            list(
                (x) => x.kumano.stats,
                (a) => ({ value: t((x) => a(x).value), label: t((x) => a(x).label) }),
            ),
        ),
        listEl(
            'days',
            heading((x) => x.home.days),
            list(
                (x) => x.kumano.days,
                (d) => ({
                    label: t((x) => d(x).date),
                    title: t((x) => d(x).route),
                    text: t((x) => d(x).description),
                    meta: t((x) => d(x).time),
                }),
            ),
        ),
    ]),
    cards(
        'stage',
        'slider',
        {
            ...sunk,
            tx_kumanokodo_anchor: 'stages',
            header: t((x) => x.home.stages.title),
            subheader: t((x) => x.home.stages.eyebrow),
        },
        list(
            (x) => x.kumano.stages,
            (st) => ({
                image: photo(st(c.en).image),
                label: t((x) => st(x).stage),
                meta: t((x) => st(x).stats),
                title: t((x) => st(x).title),
                text: t((x) => st(x).description),
            }),
        ),
    ),
    routeMap(heading((x) => x.home.map)),
    section({ space_before_class: 'flush-top', ...heading((x) => x.home.places) }, [
        columns('wide-narrow', {}, [place(0)], [place(1)]),
        columns(
            'narrow-wide',
            {},
            [place(2)],
            [images('figure', ['land-crab', 'cedar-canopy'], { bodytext: t((x) => x.home.roadsideCaption) })],
        ),
    ]),
    questions({
        tx_kumanokodo_anchor: 'faq',
        ...sunk,
        subheader: t((x) => x.home.practical.eyebrow),
        header: t((x) => x.home.practical.title),
        bodytext: t((x) => x.home.practical.intro),
    }),
    el('kumano_newsletter', { header: t((x) => x.home.newsletter.title), bodytext: t((x) => x.home.newsletter.text) }),
];

// Components no page uses, with the sample data of their stories, so every element and style is in the demo.
const components = [
    el(
        'header',
        heading((x) => x.home.map),
    ),
    el(
        'kumano_text_image',
        {
            header: t((x) => x.kumano.places[1].title),
            bodytext: t((x) => x.kumano.places[1].description),
            imageorient: 26,
        },
        { image: [photo(c.en.kumano.places[1].image)], items: links({ title: t((x) => x.ui.readMore), link: 'page:route' }) },
    ),
    columns(
        'even',
        {},
        [
            listEl(
                'media',
                { header: t((x) => x.pages.start.panelTitle) },
                mediaItems((x) => x.guide.routes),
                [{ title: t((x) => x.pages.start.panelMore), link: 'page:days' }],
            ),
        ],
        [
            cards(
                'person',
                2,
                {},
                list(
                    (x) => x.guide.hosts,
                    (h) => ({
                        image: photo(h(c.en).image),
                        title: t((x) => h(x).name),
                        meta: t((x) => h(x).role),
                        text: t((x) => h(x).focus),
                    }),
                ),
            ),
        ],
    ),
];

const nav = (i) => t((x) => x.kumano.nav[i].menu);
const route = nav(0);
const flyoutLinks = (pickLinks) =>
    pickLinks(c.en).map((_, i) => ({ label: t((x) => pickLinks(x)[i].label), link: link(pickLinks(c.en)[i].href) }));
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

const contact = (x) => x.guide.footer.columns[x.guide.footer.columns.length - 1];
// The core's access values: shown only to logged-in visitors, or hidden from them.
const anyLogin = '-2';
const hideAtLogin = '-1';
const fillIn = (template, ...values) => template.replace(/%(\d+)\$s/g, (_, n) => values[Number(n) - 1]);
// The build replaces page:<key> with the uid of that demo page.
const loginFlexform = (folder, redirect = {}) =>
    '<?xml version="1.0" encoding="utf-8" standalone="yes" ?><T3FlexForms><data><sheet index="sDEF"><language index="lDEF">' +
    `<field index="settings.pages"><value index="vDEF">page:${folder}</value></field>` +
    '</language></sheet><sheet index="s_redirect"><language index="lDEF">' +
    `<field index="settings.redirectMode"><value index="vDEF">${Object.keys(redirect).join(',')}</value></field>` +
    Object.entries(redirect)
        .map(
            ([mode, key]) =>
                `<field index="settings.redirectPage${mode[0].toUpperCase()}${mode.slice(1)}"><value index="vDEF">page:${key}</value></field>`,
        )
        .join('') +
    '</language></sheet></data></T3FlexForms>';
const formFlexform = (identifier) =>
    '<?xml version="1.0" encoding="utf-8" standalone="yes" ?><T3FlexForms><data><sheet index="sDEF"><language index="lDEF">' +
    `<field index="settings.persistenceIdentifier"><value index="vDEF">${identifier}</value></field>` +
    '<field index="settings.overrideFinishers"><value index="vDEF">0</value></field></language></sheet></data></T3FlexForms>';

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
                    links: flyoutLinks((x) => x.kumano.nav[0].menu.columns[i].links),
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
                [listEl('links', {}, [{ title: t((x) => x.site.route.title), link: 'page:route', direction: 'back' }])],
            ),
        },
    ),
    page(
        'practical',
        'home',
        t((x) => x.kumano.nav[1].label),
        {
            content: practicalContent,
            flyout: { kind: 'dropdown', columns: [{ title: t(() => ''), links: flyoutLinks((x) => x.kumano.nav[1].menu.links) }] },
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
        { navHide: true, content: [el('kumano_newsletter', { bodytext: t((x) => x.site.newsletter.intro) })] },
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
        'search',
        'home',
        t((x) => x.ui.search),
        { navHide: true, content: [el('indexedsearch_pi2')] },
    ),
    page(
        'login',
        'home',
        t((x) => x.ui.logIn),
        {
            navHide: true,
            content: [
                columns(
                    'content-sidebar',
                    {},
                    [el('felogin_login', { pi_flexform: loginFlexform('walkers', { login: 'papers' }) })],
                    [
                        el('kumano_callout', {
                            tx_kumanokodo_variant: 'infobox',
                            header: t((x) => x.ui.demoAccess),
                            bodytext: t((x) => fillIn(x.ui.demoAccessText, demoLogin.username, demoLogin.password)),
                            fe_group: hideAtLogin,
                        }),
                    ],
                ),
            ],
        },
    ),
    page(
        'papers',
        'home',
        t((x) => x.ui.papersTitle),
        {
            navHide: true,
            feGroup: anyLogin,
            content: [
                columns(
                    'content-sidebar',
                    {},
                    [
                        text(t((x) => `<p>${esc(x.ui.papersText)}</p>`)),
                        el(
                            'kumano_list',
                            { tx_kumanokodo_variant: 'downloads' },
                            { media: t((x) => x.pages.detail.downloads.map((d) => fileSlug(d.href))) },
                        ),
                    ],
                    [el('felogin_login', { pi_flexform: loginFlexform('walkers', { logout: 'login' }) })],
                ),
                cards('teaser', 4, { header: t((x) => x.site.days.groups.days) }, teasers(dayTeasers)),
            ],
        },
    ),
    page(
        'not-found',
        'home',
        t((x) => x.ui.notFoundTitle),
        {
            navHide: true,
            content: [
                section({}, [
                    text(t((x) => `<p>${esc(x.ui.notFoundText)}</p>`)),
                    listEl('links', {}, [
                        { title: t((x) => x.site.home), link: 'page:home' },
                        { title: t((x) => x.site.route.title), link: 'page:route' },
                        { title: t((x) => x.site.practical.title), link: 'page:practical' },
                    ]),
                ]),
            ],
        },
    ),
    // The walkers' accounts; a folder, so it shows in no menu.
    page(
        'walkers',
        'home',
        t(() => 'Fellow walkers'),
        { navHide: true, doktype: 254 },
    ),
    page(
        'contact',
        'home',
        t((x) => contact(x).title),
        {
            navHide: true,
            content: [
                columns(
                    'text-media',
                    {},
                    [text(t((x) => `<p>${esc(contact(x).links[1].label)}</p>`))],
                    [
                        el('form_formframework', {
                            pi_flexform: formFlexform('EXT:kumano_kodo_demo/Resources/Private/Forms/contact.form.yaml'),
                        }),
                    ],
                ),
            ],
        },
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

// Meta descriptions come from each page's own intro; a long one ends at its last full sentence within 160 characters.
const summary = (text) => {
    const plain = (Array.isArray(text) ? text[0] : text).replace(/<[^>]+>/g, '').trim();
    if (plain.length <= 160) return plain;
    const cut = plain.slice(0, 160);
    const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('。'));
    return end > 60 ? cut.slice(0, end + 1) : `${cut.slice(0, cut.lastIndexOf(' '))} …`;
};
const intros = {
    home: (x) => x.home.draft.lede,
    route: (x) => x.pages.start.text,
    days: (x) => x.site.days.intro,
    ...Object.fromEntries([1, 2, 3, 4].map((n) => [`day-${n}`, (x) => x.kumano.days[n - 1].description])),
    ...Object.fromEntries(placeSlugs.map((slug) => [`place-${slug}`, (x) => x.site.places[slug].text])),
    kohechi: (x) => x.site.kohechi.text,
    practical: (x) => x.site.practical.intro,
    ...Object.fromEntries(practicalSlugs.map((slug) => [`practical-${slug}`, (x) => x.site.practical.pages[slug].text])),
    photos: (x) => x.site.photos.intro,
    newsletter: (x) => x.site.newsletter.intro,
    ...Object.fromEntries(legalSlugs.map((slug) => [slug, (x) => x.site.legal[slug].text])),
    'home-v3': (x) => x.kumano.hero.teaser,
    contact: (x) => contact(x).links[1].label,
};
for (const p of pages) if (intros[p.key]) p.description = t((x) => summary(intros[p.key](x)));

// The frame's texts live on the root page and slide down to every page.
const footer = (x) => x.guide.footer;
const frame = [
    el('header', { header: t((x) => x.guide.topbar.label), subheader: t((x) => x.guide.topbar.value) }, { colPos: 30 }),
    el('text', { bodytext: t((x) => `<p>${footer(x).about}</p>`) }, { colPos: 20 }),
    ...footer(c.en).columns.map((col, i) => ({
        ...listEl(
            'links',
            { header: t((x) => footer(x).columns[i].title) },
            // Logged in, the walkers' column offers their papers instead of the log-in.
            linkItems((x) => footer(x).columns[i].links).flatMap((item, j) =>
                footer(c.en).columns[i].links[j].href === paths.login
                    ? [
                          { ...item, fe_group: hideAtLogin },
                          { title: t((x) => x.ui.papersLink), link: 'page:papers', fe_group: anyLogin },
                      ]
                    : [item],
            ),
        ),
        colPos: 20,
    })),
    el(
        'kumano_callout',
        { tx_kumanokodo_variant: 'notice', header: t((x) => footer(x).notice.title), bodytext: t((x) => footer(x).notice.text) },
        { colPos: 21 },
    ),
    {
        ...listEl(
            'links',
            { header: t((x) => footer(x).copyright) },
            linkItems((x) => footer(x).legal),
        ),
        colPos: 22,
    },
];
pages[0].content = [...frame, ...pages[0].content];

const frontendUsers = [{ folder: 'walkers', group: 'Fellow walkers', ...demoLogin }];

const site = {
    websiteTitle: 'Kumano Kodo',
    settings: {
        'kumanoKodo.contact.phone': c.en.guide.topbar.phone,
        'kumanoKodo.contact.email': c.en.guide.topbar.email,
        'felogin.showPermaLogin': true,
    },
    errorHandling: { 404: 'not-found', 403: 'login' },
};

const count = (elements) => elements.reduce((n, e) => n + 1 + count(Object.values(e.children ?? {}).flat()), 0);
await writeFile(out, `${JSON.stringify({ site, photos, files, pages, frontendUsers }, null, 4)}\n`);
console.log(
    `Demo: ${pages.length} pages, ${count(pages.flatMap((p) => p.content))} content elements, ${Object.keys(photos).length} photos → ${out}`,
);
