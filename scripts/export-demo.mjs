#!/usr/bin/env node
// Writes the TYPO3 demo from the Storybook content (en, de, ja): every site page, the journal home, the previous home
// and a page of the remaining components. `typo3 kumano:demo:build` turns it into records.

import { writeFile } from 'node:fs/promises';
import yaml from 'js-yaml';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'typo3/Build/Demo/content.json');

const server = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true } });
const { content, locales } = await server.ssrLoadModule('/stories/templates/content.ts');
const { routes, paths, placeSlugs, practicalSlugs, legalSlugs, routeLinks, dayStations } =
    await server.ssrLoadModule('/stories/content/paths.ts');
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

// A day page passes its day: that day's stations are highlighted.
const routeMap = (fields, day) =>
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
                    (s, i) => ({
                        name: t((x) => s(x).name),
                        x: s(c.en).x,
                        y: s(c.en).y,
                        label_y: s(c.en).labelY,
                        anchor: s(c.en).anchor ?? 'middle',
                        boundary: s(c.en).boundary ? 1 : 0,
                        highlight: day && i >= dayStations[day - 1][0] && i <= dayStations[day - 1][1] ? 1 : 0,
                        link: link(routeLinks.stations[i]),
                    }),
                ),
                tx_kumanokodo_day_marks: list(
                    (x) => x.kumano.route.days,
                    (d, i) => ({ label: t((x) => d(x).label), x: d(c.en).x, link: link(routeLinks.days[i]) }),
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
const stageCards = () =>
    list(
        (x) => x.kumano.stages,
        (st) => ({
            image: photo(st(c.en).image),
            label: t((x) => st(x).stage),
            meta: t((x) => st(x).stats),
            title: t((x) => st(x).title),
            text: t((x) => st(x).description),
            link: link(st(c.en).href),
        }),
    );
const group = (id, pickTitle, pickItems) => cards('teaser', 4, { tx_kumanokodo_anchor: id, header: t(pickTitle) }, teasers(pickItems));
const daysContent = [
    text(t((x) => `<p>${esc(x.site.days.intro)}</p>`)),
    cards('stage', 'slider', { tx_kumanokodo_anchor: 'days', header: t((x) => g(x).days) }, stageCards()),
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
            ],
        ),
        routeMap({ header: t((x) => sd(x).mapTitle) }, n),
        images('gallery', names.slice(1), { ...sunk, header: t((x) => sd(x).photos) }),
        listEl('links', {}, [
            ...(n > 1 ? [{ title: t((x) => sd(x).previous), link: `page:day-${n - 1}`, direction: 'back' }] : []),
            ...(n < 4 ? [{ title: t((x) => sd(x).next), link: `page:day-${n + 1}`, direction: 'forward' }] : []),
        ]),
    ];
};

const dayChips = (n) =>
    [1, 2, 3, 4].map((k) => ({
        title: t((x) => x.kumano.days[k - 1].date.split(' · ')[0]),
        link: `page:day-${k}`,
        ...(k === n ? { active: 1 } : {}),
    }));

const placeContent = (slug) => {
    const p = (x) => x.site.places[slug];
    const day = c.en.site.places[slug].day;
    const [lead, ...more] = c.en.site.places[slug].photos;
    return [
        images('fullwidth', [lead]),
        columns('content-sidebar', {}, [text(paragraphs((x) => p(x).text)), images('gallery', more)], []),
        listEl('links', {}, [
            { title: t((x) => x.site.days.title), link: 'page:days', direction: 'back' },
            {
                title: t((x) => `${x.kumano.days[day - 1].date}: ${x.kumano.days[day - 1].route}`),
                link: `page:day-${day}`,
                direction: 'forward',
            },
        ]),
    ];
};

const practicalContent = [
    text(t((x) => `<p>${esc(x.site.practical.intro)}</p>`)),
    tiles({ space_before_class: 'flush-top' }),
    columns('heading-content', sunk, [el('header', { header: t((x) => x.home.practical.title) })], [questions({})]),
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
                    (a) => ({ title: t((x) => a(x).label), link: link(a(c.en).href, 'at-a-glance') }),
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
        stageCards(),
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

// Components no other page uses, with the sample data of their stories: a place, the ways to walk the route, the hosts.
const components = [
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

// The form with every element type; KumanoKodo\\Demo\\Form\\WalkForm writes it there with its ContentElement's uid.
const walkFormTarget = '1:/form_definitions/walk.form.yaml';

// FlexForm values of the news plugins, sheet by sheet; page:<key> becomes the uid of that page in the build.
const newsFlexform = (sheets) =>
    '<?xml version="1.0" encoding="utf-8" standalone="yes" ?><T3FlexForms><data>' +
    Object.entries(sheets)
        .map(
            ([sheet, fields]) =>
                `<sheet index="${sheet}"><language index="lDEF">` +
                Object.entries(fields)
                    .map(([name, value]) => `<field index="settings.${name}"><value index="vDEF">${value}</value></field>`)
                    .join('') +
                '</language></sheet>',
        )
        .join('') +
    '</data></T3FlexForms>';

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
            { content: dayContent(n), chips: dayChips(n) },
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
        'reports',
        'home',
        t((x) => x.reports.title),
        {
            content: [
                text(t((x) => `<p>${esc(x.reports.intro)}</p>`)),
                el('news_pi1', {
                    pi_flexform: newsFlexform({
                        sDEF: { orderBy: 'datetime', orderDirection: 'desc', startingpoint: 'page:news-records' },
                        additional: { detailPid: 'page:report', 'list.paginate.itemsPerPage': 3, hidePagination: 0 },
                    }),
                }),
            ],
        },
    ),
    // EXT:news shows a report here; the layout without page header lets the report bring its own.
    page(
        'report',
        'reports',
        t((x) => x.reports.title),
        {
            navHide: true,
            layout: 'Landing',
            content: [
                el('news_newsdetail', {
                    pi_flexform: newsFlexform({ sDEF: { startingpoint: 'page:news-records' }, additional: { backPid: 'page:reports' } }),
                }),
            ],
        },
    ),
    page(
        'news-records',
        'home',
        t(() => 'Trail reports (records)'),
        { navHide: true, doktype: 254 },
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
        { navHide: true, noIndex: true, content: [el('indexedsearch_pi2')] },
    ),
    page(
        'login',
        'home',
        t((x) => x.ui.logIn),
        {
            navHide: true,
            noIndex: true,
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
            noIndex: true,
            content: [
                section({}, [
                    text(t((x) => `<p>${esc(x.ui.notFoundText)}</p>`)),
                    listEl('links-stacked', {}, [
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
                    'content-sidebar',
                    {},
                    [
                        el('form_formframework', {
                            pi_flexform: formFlexform('EXT:kumano_kodo_demo/Resources/Private/Forms/contact.form.yaml'),
                        }),
                    ],
                    [text(t((x) => `<p>${esc(contact(x).links[1].label)}</p>`))],
                ),
            ],
        },
    ),
    // The previous home, kept as an overview of the whole trip; linked from the route's menu.
    page(
        'at-a-glance',
        'route',
        t((x) => x.site.glance.title),
        { navHide: true, layout: 'Classic', content: v3 },
    ),
    // Linked from the practical menu, as is the form below.
    page(
        'ways',
        'practical',
        t((x) => x.site.ways.title),
        { navHide: true, content: components },
    ),
    page(
        'register',
        'practical',
        t((x) => x.walkForm.title),
        {
            navHide: true,
            content: [columns('content-sidebar', {}, [el('form_formframework', { pi_flexform: formFlexform(walkFormTarget) })], [])],
        },
    ),
    // The element the form's ContentElement shows; kept in a folder so it does not render on a page of its own.
    page(
        'form-content',
        'home',
        t(() => 'Form content'),
        {
            navHide: true,
            doktype: 254,
            content: [
                el(
                    'kumano_callout',
                    {
                        tx_kumanokodo_variant: 'infobox',
                        header: t((x) => x.walkForm.luggageTitle),
                        bodytext: t((x) => x.walkForm.luggageText),
                    },
                    { key: 'walk-luggage' },
                ),
            ],
        },
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
    'at-a-glance': (x) => x.kumano.hero.teaser,
    ways: (x) => x.kumano.places[1].description,
    register: (x) => x.walkForm.introText,
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
        'kumanoKodo.brand.logo': 'kumano',
        'kumanoKodo.brand.upright': '熊野古道',
        'kumanoKodo.brand.footerWordmark': true,
    },
    errorHandling: { 404: 'not-found', 403: 'login' },
    sets: ['kumano-kodo/site', 'kumano-kodo/news'],
    // As the news manual's quick start: readable report and page URLs, each limited to its page.
    routeEnhancers: {
        NewsDetail: {
            type: 'Extbase',
            limitToPages: ['report'],
            extension: 'News',
            plugin: 'Pi1',
            routes: [{ routePath: '/{news-title}', _controller: 'News::detail', _arguments: { 'news-title': 'news' } }],
            aspects: { 'news-title': { type: 'NewsTitle' } },
        },
        NewsList: {
            type: 'Extbase',
            limitToPages: ['reports'],
            extension: 'News',
            plugin: 'Pi1',
            routes: [{ routePath: '/page-{page}', _controller: 'News::list', _arguments: { page: 'currentPage' } }],
            defaultController: 'News::list',
            defaults: { page: '' },
            requirements: { page: '\\d+' },
            aspects: { page: { type: 'StaticRangeMapper', start: '1', end: '100' } },
        },
    },
};

// The trail reports as EXT:news records: the first photo is the preview, the others the gallery below.
const reportOf = (x, i) => x.reports.items[i];
const tagKeys = [...new Set(c.en.reports.items.flatMap((r) => r.tags))];
const news = {
    folder: 'news-records',
    categories: Object.fromEntries(Object.keys(c.en.reports.categories).map((key) => [key, t((x) => x.reports.categories[key])])),
    tags: Object.fromEntries(
        tagKeys.map((tag) => {
            const [i, j] = c.en.reports.items.flatMap((r, ri) => r.tags.map((tt, ti) => (tt === tag ? [ri, ti] : null))).find(Boolean);
            return [tag, t((x) => reportOf(x, i).tags[j])];
        }),
    ),
    items: c.en.reports.items.map((r, i) => ({
        slug: r.slug,
        datetime: r.date,
        title: t((x) => reportOf(x, i).title),
        teaser: t((x) => reportOf(x, i).teaser),
        bodytext: t((x) =>
            reportOf(x, i)
                .text.map((p) => `<p>${esc(p)}</p>`)
                .join(''),
        ),
        categories: [r.category],
        tags: r.tags,
        images: r.photos.map((name, n) => ({ photo: name, showinpreview: n === 0 ? 1 : 0 })),
    })),
};

// The walk form: English in the definition, every language in its XLIFF, all from the Storybook content.
const walkForm = () => {
    const w = (x) => x.walkForm;
    // Keys start at 1: Fluid takes "0" for empty, and the summary would skip the answer.
    const options = (pick) => Object.fromEntries(pick(c.en).map((label, i) => [String(i + 1), label]));
    const required = { properties: { fluidAdditionalAttributes: { required: 'required' } }, validators: [{ identifier: 'NotEmpty' }] };
    const field = (identifier, type, label, extra = {}) => ({ identifier, type, label, ...extra });
    const nav = { renderingOptions: { previousButtonLabel: w(c.en).previous, nextButtonLabel: w(c.en).next } };
    const definition = {
        identifier: 'walk',
        label: w(c.en).title,
        type: 'Form',
        prototypeName: 'standard',
        renderingOptions: {
            submitButtonLabel: w(c.en).submit,
            translation: { translationFiles: { 20: 'EXT:kumano_kodo_demo/Resources/Private/Language/form_walk.xlf' } },
        },
        finishers: [{ identifier: 'Confirmation', options: { message: w(c.en).sentText } }],
        renderables: [
            field('about', 'Page', w(c.en).steps[0], {
                ...nav,
                renderables: [
                    field('intro', 'StaticText', w(c.en).introTitle, { properties: { text: w(c.en).introText } }),
                    field('name', 'Text', w(c.en).name, {
                        ...required,
                        properties: { fluidAdditionalAttributes: { required: 'required', autocomplete: 'name' } },
                    }),
                    field('email', 'Email', w(c.en).email, {
                        properties: { fluidAdditionalAttributes: { required: 'required', autocomplete: 'email' } },
                        validators: [{ identifier: 'NotEmpty' }, { identifier: 'EmailAddress' }],
                    }),
                    field('phone', 'Telephone', w(c.en).phone, { properties: { fluidAdditionalAttributes: { autocomplete: 'tel' } } }),
                    field('website', 'Url', w(c.en).website, { properties: { elementDescription: w(c.en).websiteHint } }),
                    field('group', 'Number', w(c.en).groupSize, {
                        defaultValue: 2,
                        properties: { fluidAdditionalAttributes: { min: 1, max: 12 } },
                    }),
                    field('dates', 'GridRow', '', {
                        renderables: [
                            field('arrival-column', 'GridColumn', '', { renderables: [field('arrival', 'Date', w(c.en).arrival)] }),
                            field('departure-column', 'GridColumn', '', {
                                renderables: [
                                    field('departure', 'DatePicker', w(c.en).departure, {
                                        properties: { dateFormat: 'd.m.Y', elementDescription: w(c.en).departureHint },
                                    }),
                                ],
                            }),
                        ],
                    }),
                    field('account', 'Fieldset', w(c.en).account, {
                        renderables: [
                            field('password', 'Password', w(c.en).password, {
                                properties: { fluidAdditionalAttributes: { autocomplete: 'current-password' } },
                            }),
                            field('new-password', 'AdvancedPassword', w(c.en).newPassword, {
                                properties: {
                                    confirmationLabel: w(c.en).confirmPassword,
                                    fluidAdditionalAttributes: { autocomplete: 'new-password' },
                                },
                            }),
                        ],
                    }),
                    field('source', 'Hidden', '', { defaultValue: 'demo' }),
                ],
            }),
            field('walk', 'Page', w(c.en).steps[1], {
                ...nav,
                renderables: [
                    field('route', 'RadioButton', w(c.en).route, {
                        defaultValue: '1',
                        properties: { options: options((x) => w(x).routes) },
                    }),
                    field('pace', 'SingleSelect', w(c.en).pace, { properties: { options: options((x) => w(x).paces) } }),
                    field('interests', 'MultiCheckbox', w(c.en).interests, {
                        properties: { options: options((x) => w(x).interestOptions) },
                    }),
                    field('languages', 'MultiSelect', w(c.en).languages, { properties: { options: options((x) => w(x).languageOptions) } }),
                    field('country', 'CountrySelect', w(c.en).country, { properties: { prioritizedCountries: ['DE', 'JP'] } }),
                    field('luggage', 'ContentElement', '', { properties: { contentElementUid: 0 } }),
                    field('notes', 'Textarea', w(c.en).notes, { properties: { fluidAdditionalAttributes: { rows: 4 } } }),
                    field('consent', 'Checkbox', w(c.en).consent, {
                        ...required,
                        properties: { value: 1, fluidAdditionalAttributes: { required: 'required' } },
                    }),
                ],
            }),
            field('photos', 'Page', w(c.en).steps[2], {
                ...nav,
                renderables: [
                    field('photo', 'ImageUpload', w(c.en).photo, {
                        properties: {
                            saveToFileMount: '1:/user_upload/',
                            allowedMimeTypes: ['image/jpeg', 'image/png'],
                            allowRemoval: true,
                            elementDescription: w(c.en).photoHint,
                        },
                    }),
                    field('route-file', 'FileUpload', w(c.en).routeFile, {
                        properties: {
                            saveToFileMount: '1:/user_upload/',
                            allowedMimeTypes: ['application/pdf'],
                            allowRemoval: true,
                            elementDescription: w(c.en).fileHint,
                        },
                    }),
                ],
            }),
            field('summary', 'SummaryPage', w(c.en).summaryTitle, nav),
        ],
    };
    // Every translatable property of the definition, keyed as EXT:form looks it up.
    const units = (x) => {
        const v = w(x);
        const u = { 'walk.renderingOptions.submitButtonLabel': v.submit, 'walk.finisher.Confirmation.message': v.sentText };
        const label = (id, text) => (u[`walk.element.${id}.properties.label`] = text);
        ['about', 'walk', 'photos'].forEach((id, i) => label(id, v.steps[i]));
        label('summary', v.summaryTitle);
        for (const id of ['about', 'walk', 'photos', 'summary']) {
            u[`walk.element.${id}.renderingOptions.previousButtonLabel`] = v.previous;
            u[`walk.element.${id}.renderingOptions.nextButtonLabel`] = v.next;
        }
        label('intro', v.introTitle);
        u['walk.element.intro.properties.text'] = v.introText;
        Object.entries({
            name: v.name,
            email: v.email,
            phone: v.phone,
            website: v.website,
            group: v.groupSize,
            arrival: v.arrival,
            departure: v.departure,
            account: v.account,
            password: v.password,
            'new-password': v.newPassword,
            route: v.route,
            pace: v.pace,
            interests: v.interests,
            languages: v.languages,
            country: v.country,
            notes: v.notes,
            consent: v.consent,
            photo: v.photo,
            'route-file': v.routeFile,
        }).forEach(([id, text]) => label(id, text));
        u['walk.element.new-password.properties.confirmationLabel'] = v.confirmPassword;
        Object.entries({ website: v.websiteHint, departure: v.departureHint, photo: v.photoHint, 'route-file': v.fileHint }).forEach(
            ([id, text]) => (u[`walk.element.${id}.properties.elementDescription`] = text),
        );
        Object.entries({ route: v.routes, pace: v.paces, interests: v.interestOptions, languages: v.languageOptions }).forEach(
            ([id, list]) => list.forEach((text, i) => (u[`walk.element.${id}.properties.options.${i + 1}`] = text)),
        );
        return u;
    };
    const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const xliff = (lang) => {
        const source = units(c.en);
        const target = units(c[lang]);
        const body = Object.keys(source)
            .map(
                (id) =>
                    `            <trans-unit id="${id}">\n                <source>${xml(source[id])}</source>\n` +
                    (lang === 'en' ? '' : `                <target>${xml(target[id])}</target>\n`) +
                    `            </trans-unit>`,
            )
            .join('\n');
        return (
            `<?xml version="1.0" encoding="UTF-8"?>\n<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">\n` +
            `    <file source-language="en"${lang === 'en' ? '' : ` target-language="${lang}"`} datatype="plaintext" original="form_walk" product-name="kumano_kodo_demo">\n        <body>\n${body}\n        </body>\n    </file>\n</xliff>\n`
        );
    };
    return { definition, xliff };
};

const demoPackage = join(root, 'typo3/packages/kumano_kodo_demo');
const { definition, xliff } = walkForm();
await writeFile(
    join(demoPackage, 'Resources/Private/Forms/walk.form.yaml'),
    `# Generated by scripts/export-demo.mjs. kumano:demo:build fills in contentElementUid and copies it to ${walkFormTarget}.\n${yaml.dump(definition, { lineWidth: -1, noRefs: true })}`,
);
for (const lang of langs)
    await writeFile(join(demoPackage, `Resources/Private/Language/${lang === 'en' ? '' : `${lang}.`}form_walk.xlf`), xliff(lang));

const count = (elements) => elements.reduce((n, e) => n + 1 + count(Object.values(e.children ?? {}).flat()), 0);
await writeFile(out, `${JSON.stringify({ site, photos, files, pages, frontendUsers, news }, null, 4)}\n`);
console.log(
    `Demo: ${pages.length} pages, ${count(pages.flatMap((p) => p.content))} content elements, ${Object.keys(photos).length} photos → ${out}`,
);
