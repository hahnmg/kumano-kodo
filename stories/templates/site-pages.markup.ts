import { walkForm } from './walk-form';
import { skipLink } from '../atoms/skip-link.markup';
import { fill } from '../../src/lib/html';
import { checkbox } from '../atoms/checkbox.markup';
import { link } from '../atoms/link.markup';
import { select } from '../atoms/select.markup';
import { textField } from '../atoms/text-field.markup';
import { textarea } from '../atoms/textarea.markup';
import { paths, practicalSlugs, type LegalSlug, type PlaceSlug, type PracticalSlug } from '../content/paths';
import { cluster, grid, section, split, stack } from '../layout/layout.markup';
import { ctaCard } from '../molecules/cta-card.markup';
import { downloadList } from '../molecules/download-list.markup';
import { factList } from '../molecules/fact-list.markup';
import { faqList } from '../molecules/faq-item.markup';
import { figure } from '../molecules/figure.markup';
import { form } from '../molecules/form.markup';
import { gallery } from '../molecules/gallery.markup';
import { iconFact } from '../molecules/icon-fact.markup';
import { infoBox } from '../molecules/info-box.markup';
import { linkTile } from '../molecules/link-tile.markup';
import { loginForm } from '../molecules/login-form.markup';
import { newsletterForm } from '../molecules/newsletter-form.markup';
import { richText } from '../molecules/rich-text.markup';
import { searchForm } from '../molecules/search-form.markup';
import { searchResults } from '../molecules/search-results.markup';
import { sectionHeading } from '../molecules/section-heading.markup';
import { subNav } from '../molecules/sub-nav.markup';
import { teaserCard, type TeaserCardProps } from '../molecules/teaser-card.markup';
import { bleedImage } from '../molecules/bleed-image.markup';
import { chapter } from '../organisms/chapter.markup';
import { slider } from '../organisms/slider.markup';
import { portraitCard } from '../molecules/portrait-card.markup';
import { heroSplit } from '../organisms/hero-split.markup';
import { pageHeader } from '../organisms/page-header.markup';
import { routeMap } from '../organisms/route-map.markup';
import { siteFooter } from '../organisms/site-footer.markup';
import { siteHeader } from '../organisms/site-header.markup';
import { topbar } from '../organisms/topbar.markup';
import { content, type Content } from './content';
import { dayPhotos } from './journal-photos';
import { demoLogin } from '../content/demo-login';
import { kumanoJournal } from './kumano-journal.markup';
import { searchSample } from './search-sample';

// Which top-level nav item a page belongs to: 0 the route, 1 practical, 2 photos, -1 none.
type Section = -1 | 0 | 1 | 2;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const paragraphs = (texts: readonly string[]) => texts.map((t) => `<p>${esc(t)}</p>`).join('');
const lightbox = ({ ui }: Content) => ({ close: ui.close, previous: ui.previous, next: ui.next });

const chrome = (c: Content, active: Section, main: string): string =>
    skipLink({ label: c.ui.skipToContent }) +
    topbar({ ...c.guide.topbar, ariaLabel: c.ui.trailStatus }) +
    siteHeader({
        nav: c.kumano.nav.map((n, i) => ({ ...n, active: i === active })),
        languages: c.languages,
        labels: { nav: c.ui.mainNav, languages: c.ui.language, scheme: c.ui.darkMode, menu: c.ui.menu },
        search: { action: paths.search, label: c.ui.search, submit: c.ui.search, placeholder: c.ui.searchPlaceholder },
    }) +
    `<main id="main">${main}</main>` +
    siteFooter({ ...c.guide.footer, backToTop: c.ui.backToTop });

const crumbs = (c: Content, trail: [string, string][], current: string) => [
    { label: c.site.home, href: paths.home },
    ...trail.map(([label, href]) => ({ label, href })),
    { label: current },
];

const header = (c: Content, title: string, trail: [string, string][], chips?: { label: string; href: string; active?: boolean }[]) =>
    pageHeader({ title, breadcrumb: crumbs(c, trail, title), breadcrumbLabel: c.ui.breadcrumb, chips, chipsLabel: c.ui.categories });

const teasers = (items: TeaserCardProps[], level: 2 | 3 = 3) => items.map((e) => teaserCard({ ...e, level }));

// The day pages also carry the sea of clouds, which the home page shows full width between days one and two.
const photosOfDay = (i: number) => [...(i === 1 ? (['sea-of-clouds'] as const) : []), ...dayPhotos[i].map(([name]) => name)];

const dayTeasers = ({ kumano, site, photos }: Content): TeaserCardProps[] =>
    kumano.days.map((d, i) => ({
        image: photos[dayPhotos[i][Math.min(1, dayPhotos[i].length - 1)][0]],
        title: d.route,
        subtitle: site.day.distances[i],
        meta: `${d.date} · ${d.time}`,
        href: paths.day(i + 1),
    }));

export const homePage = (c: Content = content()): string => kumanoJournal(c);

// The former start template: overview of the whole walk.
export const routePage = (c: Content = content()): string => {
    const { guide, pages, kumano, ui, home } = c;
    const s = pages.start;
    return chrome(
        c,
        0,
        heroSplit({
            title: s.title,
            text: s.text,
            action: { label: s.action, href: paths.days },
            panel: { title: s.panelTitle, items: guide.routes, more: { label: s.panelMore, href: paths.days } },
        }) +
            section({ label: s.factsLabel, content: grid(guide.facts.map(iconFact), 4) }) +
            section({
                space: 'flush-top',
                content: stack([sectionHeading({ title: s.stages.title }), grid(teasers(dayTeasers(c)), 4)], 'heading'),
            }) +
            section({
                id: 'map',
                content: stack(
                    [sectionHeading({ title: home.map.title, variant: 'with-aside', aside: home.map.aside }), routeMap(kumano.route)],
                    'heading',
                ),
            }) +
            section({
                tone: 'sunk',
                content: stack(
                    [
                        sectionHeading({ title: s.prep.title }),
                        grid(
                            guide.prep.map((p) => ctaCard({ ...p, linkLabel: ui.readMore })),
                            3,
                        ),
                    ],
                    'heading',
                ),
            }) +
            section({ content: stack([sectionHeading({ title: s.plan }), grid(guide.tiles.map(linkTile), 2)], 'heading') }),
    );
};

// The former list template: every day, place and stay, with the chips jumping to the groups.
export const daysPage = (c: Content = content()): string => {
    const { guide, site, pages, kumano } = c;
    const g = site.days.groups;
    const stations = kumano.route.stations;
    const stays: TeaserCardProps[] = [
        { image: c.photos['misty-valley'], title: stations[1].name, meta: kumano.days[0].date, href: paths.day(1) },
        { image: c.photos['vending-machines'], title: stations[2].name, meta: kumano.days[1].date, href: paths.place('chikatsuyu') },
        { image: c.photos['outdoor-bath'], title: guide.entries[5].title, meta: kumano.days[2].date, href: paths.place('yunomine') },
        { image: c.photos['ryokan-room'], title: guide.entries[7].title, meta: kumano.days[3].date, href: paths.day(4) },
    ];
    const group = (id: string, title: string, items: TeaserCardProps[]) =>
        section({ id, content: stack([sectionHeading({ title }), grid(teasers(items, 3), 4)], 'heading') });
    return chrome(
        c,
        0,
        header(
            c,
            site.days.title,
            [[site.route.title, paths.route]],
            [
                { label: pages.list.chips[0], href: '#days', active: true },
                { label: g.days, href: '#days' },
                { label: g.places, href: '#places' },
                { label: g.stays, href: '#stays' },
            ],
        ) +
            section({ content: richText({ html: `<p>${esc(site.days.intro)}</p>` }) }) +
            section({
                id: 'days',
                bleed: true,
                content: slider({
                    heading: { title: g.days },
                    items: kumano.stages.map(portraitCard),
                    labels: { previous: c.ui.previous, next: c.ui.next, item: c.ui.card },
                }),
            }) +
            group('places', g.places, guide.entries.slice(4, 7)) +
            group('stays', g.stays, stays),
    );
};

// The former detail template: one day with its text, photos, figures and a way to the next day.
export const dayPage = (n: number, c: Content = content()): string => {
    const { kumano, site, home, photos } = c;
    const i = n - 1;
    const d = kumano.days[i];
    const s = site.day;
    const names = photosOfDay(i);
    const dayNav = kumano.days.map((day, k) => ({
        label: `${day.date.split(' · ')[0]} · ${day.route}`,
        href: paths.day(k + 1),
        active: k === i,
    }));
    const steps = [
        n > 1 ? link({ label: s.previous, href: paths.day(n - 1), direction: 'back' }) : '',
        n < 4 ? link({ label: s.next, href: paths.day(n + 1) }) : '',
    ];
    return chrome(
        c,
        0,
        header(c, d.route, [
            [site.route.title, paths.route],
            [site.days.title, paths.days],
        ]) +
            section({
                content: split(
                    stack(
                        [
                            figure({
                                images: [photos[names[0]]],
                                caption: photos[names[0]].caption ?? '',
                                rule: false,
                                labels: lightbox(c),
                            }),
                            richText({ html: paragraphs([home.draft.chapters[i], d.description]) }),
                        ],
                        'column',
                    ),
                    stack(
                        [
                            factList({
                                title: s.factsTitle,
                                facts: [
                                    { label: s.facts.date, value: d.date },
                                    { label: s.facts.route, value: d.route },
                                    { label: s.facts.distance, value: s.distances[i] },
                                    { label: s.facts.photos, value: d.time },
                                ],
                            }),
                            infoBox({
                                title: s.tipTitle,
                                text: s.tips[i],
                                links: [{ label: site.practical.title, href: paths.practical }],
                            }),
                            subNav({ title: site.days.groups.days, items: dayNav }),
                        ],
                        'column',
                    ),
                    'content-sidebar',
                ),
            }) +
            section({
                tone: 'sunk',
                content: stack(
                    [
                        sectionHeading({ title: s.photos }),
                        gallery({ images: names.slice(1).map((name) => photos[name]), labels: lightbox(c) }),
                    ],
                    'heading',
                ),
            }) +
            section({ content: cluster(steps.filter(Boolean)) }),
    );
};

export const placePage = (slug: PlaceSlug, c: Content = content()): string => {
    const { site, photos, kumano } = c;
    const p = site.places[slug];
    return chrome(
        c,
        0,
        header(c, p.title, [
            [site.route.title, paths.route],
            [site.days.title, paths.days],
        ]) +
            section({
                content: split(
                    stack(
                        [
                            richText({ html: paragraphs(p.text) }),
                            gallery({ images: p.photos.map((name) => photos[name]), labels: lightbox(c) }),
                        ],
                        'column',
                    ),
                    '',
                    'content-sidebar',
                ),
            }) +
            section({
                content: cluster([
                    link({ label: site.days.title, href: paths.days, direction: 'back' }),
                    link({ label: `${kumano.days[p.day - 1].date}: ${kumano.days[p.day - 1].route}`, href: paths.day(p.day) }),
                ]),
            }),
    );
};

export const practicalPage = (c: Content = content()): string => {
    const { site, guide, kumano, home } = c;
    return chrome(
        c,
        1,
        header(c, site.practical.title, []) +
            section({ content: richText({ html: `<p>${esc(site.practical.intro)}</p>` }) }) +
            section({ space: 'flush-top', content: grid(guide.tiles.map(linkTile), 2) }) +
            section({
                tone: 'sunk',
                content: split(sectionHeading({ title: home.practical.title }), faqList(kumano.faq), 'heading-content'),
            }),
    );
};

export const practicalSubPage = (slug: PracticalSlug, c: Content = content()): string => {
    const { site, pages } = c;
    const page = site.practical.pages[slug];
    const nav = practicalSlugs.map((s) => ({ label: site.practical.pages[s].title, href: paths.practicalPage(s), active: s === slug }));
    return chrome(
        c,
        1,
        header(c, page.title, [[site.practical.title, paths.practical]]) +
            section({
                content: split(
                    stack(
                        [
                            richText({ html: paragraphs(page.text) }),
                            slug === 'maps' ? downloadList({ items: pages.detail.downloads }) : '',
                        ].filter(Boolean),
                        'column',
                    ),
                    subNav({ title: site.practical.title, items: nav }),
                    'content-sidebar',
                ),
            }),
    );
};

// All photos, day by day, with the same chapters as the home page.
export const photosPage = (c: Content = content()): string => {
    const { site, kumano, home, photos } = c;
    return chrome(
        c,
        2,
        header(c, site.photos.title, []) +
            section({ content: richText({ html: `<p>${esc(site.photos.intro)}</p>` }) }) +
            dayPhotos
                .map((list, i) =>
                    chapter({
                        id: `photos-day-${i + 1}`,
                        number: String(i + 1),
                        date: `${kumano.days[i].date} · ${kumano.days[i].time}`,
                        title: kumano.days[i].route,
                        text: home.draft.chapters[i],
                        photos: list.map(([name, span, shift]) => ({ image: photos[name], span, shift })),
                        labels: lightbox(c),
                    }),
                )
                .join('') +
            bleedImage(photos['sea-of-clouds'], undefined, lightbox(c)) +
            bleedImage(photos['evening-rooftops'], `${home.draft.coda} ${photos['evening-rooftops'].caption ?? ''}`, lightbox(c)),
    );
};

export const newsletterPage = (c: Content = content()): string => {
    const { site, ui } = c;
    return chrome(
        c,
        1,
        header(c, site.newsletter.title, []) +
            section({
                content: split(
                    richText({ html: `<p>${esc(site.newsletter.intro)}</p>` }),
                    newsletterForm({
                        action: '#',
                        emailLabel: ui.emailAddress,
                        placeholder: ui.emailPlaceholder,
                        consent: ui.consent,
                        submit: ui.subscribe,
                    }),
                    'text-media',
                ),
            }),
    );
};

const textPage = (c: Content, active: Section, title: string, text: readonly string[], trail: [string, string][] = [], after = '') =>
    chrome(
        c,
        active,
        header(c, title, trail) + section({ content: stack([richText({ html: paragraphs(text) }), after].filter(Boolean), 'elements') }),
    );

export const kohechiPage = (c: Content = content()): string =>
    textPage(
        c,
        0,
        c.site.kohechi.title,
        c.site.kohechi.text,
        [[c.site.route.title, paths.route]],
        link({ label: c.site.route.title, href: paths.route, direction: 'back' }),
    );

export const legalPage = (slug: LegalSlug, c: Content = content()): string =>
    textPage(c, -1, c.site.legal[slug].title, c.site.legal[slug].text);

// The sample query per language; the results are what the journal's own texts answer to it.
const sampleQuery: Record<string, string> = { en: 'bus', de: 'Bus', ja: 'バス' };

export const searchPage = (c: Content = content()): string => {
    const query = sampleQuery[c.locale] ?? 'bus';
    const items = searchSample(c, query);
    const summary =
        items.length === 1
            ? fill(c.ui.searchSummaryOne, query)
            : items.length
              ? fill(c.ui.searchSummary, items.length, query)
              : fill(c.ui.searchEmpty, query);
    return chrome(
        c,
        -1,
        header(c, c.ui.search, []) +
            section({
                content: stack(
                    [
                        searchForm({
                            action: paths.search,
                            label: c.ui.search,
                            submit: c.ui.search,
                            placeholder: c.ui.searchPlaceholder,
                            value: query,
                            landmark: c.ui.searchResults,
                        }),
                        searchResults({ label: c.ui.searchResults, summary, items }),
                    ],
                    'heading',
                ),
            }),
    );
};

const loginLabels = ({ ui }: Content) => ({
    username: ui.username,
    password: ui.password,
    stayLoggedIn: ui.stayLoggedIn,
    logIn: ui.logIn,
    forgotPassword: ui.forgotPassword,
    loginFailed: ui.loginFailed,
    loginFailedText: ui.loginFailedText,
    loggedInAs: ui.loggedInAs,
    logOut: ui.logOut,
});

// The demo's form with every EXT:form element type; the other steps are in Molecules/Form.
export const formElementsPage = (c: Content = content()): string =>
    chrome(c, -1, header(c, c.walkForm.title, []) + section({ content: split(walkForm(c), '', 'content-sidebar') }));

export const loginPage = (c: Content = content()): string =>
    chrome(
        c,
        -1,
        header(c, c.ui.logIn, []) +
            section({
                content: split(
                    loginForm({ action: paths.login, labels: loginLabels(c), forgotHref: `${paths.login}#forgot` }),
                    infoBox({ title: c.ui.demoAccess, text: fill(c.ui.demoAccessText, demoLogin.username, demoLogin.password) }),
                    'content-sidebar',
                ),
            }),
    );

export const contactPage = (c: Content = content()): string => {
    const { ui, site } = c;
    const contact = c.guide.footer.columns[c.guide.footer.columns.length - 1];
    const topics = practicalSlugs.map((slug) => site.practical.pages[slug].title);
    return chrome(
        c,
        -1,
        header(c, contact.title, []) +
            section({
                content: split(
                    form({
                        action: paths.contact,
                        fields: [
                            textField({ label: `${ui.name} *`, name: 'name', autocomplete: 'name', required: true }),
                            textField({
                                label: `${ui.emailAddress} *`,
                                name: 'email',
                                type: 'email',
                                autocomplete: 'email',
                                placeholder: ui.emailPlaceholder,
                                required: true,
                            }),
                            select({ label: ui.topic, name: 'topic', options: topics }),
                            textarea({ label: `${ui.message} *`, name: 'message', rows: 6, required: true }),
                            checkbox({ label: `${ui.contactConsent} *`, name: 'consent', required: true }),
                        ],
                        note: ui.requiredNote,
                        submit: ui.send,
                    }),
                    richText({ html: `<p>${esc(contact.links[1].label)}</p>` }),
                    'content-sidebar',
                ),
            }),
    );
};

// What an unknown address answers: where you are not, and three ways back onto the trail.
export const notFoundPage = (c: Content = content()): string =>
    chrome(
        c,
        -1,
        header(c, c.ui.notFoundTitle, []) +
            section({
                content: stack(
                    [
                        richText({ html: `<p>${esc(c.ui.notFoundText)}</p>` }),
                        stack([
                            link({ label: c.site.home, href: paths.home }),
                            link({ label: c.site.route.title, href: paths.route }),
                            link({ label: c.site.practical.title, href: paths.practical }),
                        ]),
                    ],
                    'elements',
                ),
            }),
    );

// Behind the log-in: the walk's papers and the way back to each day; the footer offers this page instead of the log-in.
export const papersPage = (c: Content = content()): string => {
    const { ui, site, pages, guide } = c;
    const columns = guide.footer.columns.map((col) => ({
        ...col,
        links: col.links.map((l) => (l.href === paths.login ? { label: ui.papersLink, href: paths.papers } : l)),
    }));
    return chrome(
        { ...c, guide: { ...guide, footer: { ...guide.footer, columns } } },
        -1,
        header(c, ui.papersTitle, []) +
            section({
                content: split(
                    stack([richText({ html: `<p>${esc(ui.papersText)}</p>` }), downloadList({ items: pages.detail.downloads })], 'column'),
                    loginForm({ action: paths.login, labels: loginLabels(c), user: demoLogin.username }),
                    'content-sidebar',
                ),
            }) +
            section({ content: stack([sectionHeading({ title: site.days.groups.days }), grid(teasers(dayTeasers(c), 3), 4)], 'heading') }),
    );
};
