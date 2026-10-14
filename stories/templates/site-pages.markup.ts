import { pagination } from '../molecules/pagination.markup';
import type { PhotoName } from './content';
import { mediaConsent } from '../molecules/media-consent.markup';
import { mediaList } from '../molecules/media-list.markup';
import { personCard } from '../molecules/person-card.markup';
import { textMedia } from '../molecules/text-media.markup';
import { walkForm, type WalkFormStep } from './walk-form';
import { skipLink } from '../atoms/skip-link.markup';
import { fill } from '../../src/lib/html';
import { checkbox } from '../atoms/checkbox.markup';
import { link } from '../atoms/link.markup';
import { select } from '../atoms/select.markup';
import { textField } from '../atoms/text-field.markup';
import { textarea } from '../atoms/textarea.markup';
import { asVideo } from '../content/videos';
import { heroSlidesOf } from './kumano-home.markup';
import { linkRoute, paths, practicalSlugs, type LegalSlug, type PlaceSlug, type PracticalSlug } from '../content/paths';
import { cluster, grid, section, split, stack } from '../layout/layout.markup';
import { ctaCard } from '../molecules/cta-card.markup';
import { downloadList } from '../molecules/download-list.markup';
import { factList } from '../molecules/fact-list.markup';
import { faqList } from '../molecules/faq-item.markup';
import { figure } from '../molecules/figure.markup';
import { form } from '../molecules/form.markup';
import { gallery } from '../molecules/gallery.markup';
import { featureCard } from '../molecules/feature-card.markup';
import { highlight } from '../molecules/highlight.markup';
import { hero, heroSlides } from '../organisms/hero.markup';
import { linkGroups } from '../molecules/link-groups.markup';
import { notice } from '../molecules/notice.markup';
import { statRow } from '../molecules/stat.markup';
import { timeline } from '../molecules/timeline-item.markup';
import { iconFact } from '../molecules/icon-fact.markup';
import { infoBox } from '../molecules/info-box.markup';
import { linkTile } from '../molecules/link-tile.markup';
import { loginForm } from '../molecules/login-form.markup';
import { newsletterForm } from '../molecules/newsletter-form.markup';
import { quote } from '../molecules/quote.markup';
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
type Section = -1 | 0 | 1 | 2 | 3;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const paragraphs = (texts: readonly string[]) => texts.map((t) => `<p>${esc(t)}</p>`).join('');
const lightbox = ({ ui }: Content) => ({ close: ui.close, previous: ui.previous, next: ui.next, play: ui.playVideo });

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
  pageHeader({ title, breadcrumb: crumbs(c, trail, title), breadcrumbLabel: c.ui.breadcrumb, chips, chipsLabel: c.ui.inSection });

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
          [sectionHeading({ title: home.map.title, variant: 'with-aside', aside: home.map.aside }), routeMap(linkRoute(kumano.route))],
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
// The stages as the text editor writes a table, with the class and wrapper the theme's parseFunc adds.
export const stagesTable = ({ site, kumano }: Content): string =>
  `<div class="table-wrap"><table class="table"><thead><tr>${site.days.stagesTable.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>` +
  kumano.stages.map((s) => `<tr><td>${esc(s.stage)}</td><td>${esc(s.title)}</td><td>${esc(s.stats)}</td></tr>`).join('') +
  `</tbody></table></div>`;

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
        content: stack([sectionHeading({ title: site.days.stagesTable.title }), richText({ html: stagesTable(c) })], 'heading'),
      }) +
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
  const dayChips = kumano.days.map((day, k) => ({
    label: day.date.split(' · ')[0],
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
    header(
      c,
      d.route,
      [
        [site.route.title, paths.route],
        [site.days.title, paths.days],
      ],
      dayChips,
    ) +
      section({
        content: split(
          stack(
            [
              figure({
                images: [n === 2 ? asVideo(photos[names[0]]) : photos[names[0]]],
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
            ],
            'column',
          ),
          'content-sidebar',
        ),
      }) +
      section({ content: quote(s.quotes[i]) }) +
      section({ content: stack([sectionHeading({ title: s.mapTitle }), routeMap(linkRoute(kumano.route, n))], 'heading') }) +
      section({
        tone: 'sunk',
        content: stack(
          [sectionHeading({ title: s.photos }), gallery({ images: names.slice(1).map((name) => photos[name]), labels: lightbox(c) })],
          'heading',
        ),
      }) +
      section({ content: cluster(steps.filter(Boolean)) }),
  );
};

export const placePage = (slug: PlaceSlug, c: Content = content()): string => {
  const { site, photos, kumano } = c;
  const p = site.places[slug];
  const [lead, ...more] = p.photos.map((name) => photos[name]);
  return chrome(
    c,
    0,
    header(c, p.title, [
      [site.route.title, paths.route],
      [site.days.title, paths.days],
    ]) +
      bleedImage(lead, undefined, lightbox(c)) +
      section({
        content: split(
          stack([richText({ html: paragraphs(p.text) }), more.length ? gallery({ images: more, labels: lightbox(c) }) : ''], 'column'),
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
            [richText({ html: paragraphs(page.text) }), slug === 'maps' ? downloadList({ items: pages.detail.downloads }) : ''].filter(
              Boolean,
            ),
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

const textPage = (
  c: Content,
  active: Section,
  title: string,
  text: readonly string[],
  trail: [string, string][] = [],
  after = '',
  more = '',
) =>
  chrome(
    c,
    active,
    header(c, title, trail) + section({ content: stack([richText({ html: paragraphs(text) }), after].filter(Boolean), 'elements') }) + more,
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

// The privacy page carries the switch for external videos, as the demo's does.
const mediaConsentSection = (c: Content): string =>
  section({
    content: stack(
      [sectionHeading({ title: c.ui.mediaConsentTitle }), mediaConsent({ text: c.ui.mediaConsentText, toggle: c.ui.mediaConsentToggle })],
      'heading',
    ),
  });

export const legalPage = (slug: LegalSlug, c: Content = content()): string =>
  textPage(c, -1, c.site.legal[slug].title, c.site.legal[slug].text, [], '', slug === 'privacy' ? mediaConsentSection(c) : '');

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

// The demo's news, from EXT:news in TYPO3: three reports a page, newest first.
const reportsPerPage = 3;
const longDate = (c: Content, iso: string) =>
  new Intl.DateTimeFormat(c.locale === 'en' ? 'en-GB' : c.locale, { dateStyle: 'long' }).format(new Date(iso));

export const reportsPage = (page: number, c: Content = content()): string => {
  const { reports, photos, ui } = c;
  const pages = Math.ceil(reports.items.length / reportsPerPage);
  const items = reports.items.slice((page - 1) * reportsPerPage, page * reportsPerPage);
  return chrome(
    c,
    3,
    header(c, reports.title, []) +
      // In TYPO3 the intro is a text element of its own, the list the news plugin.
      section({ content: richText({ html: `<p>${esc(reports.intro)}</p>` }) }) +
      section({
        content: stack(
          [
            grid(
              items.map((r) =>
                teaserCard({
                  image: photos[r.photos[0] as PhotoName],
                  title: r.title,
                  href: paths.report(r.slug),
                  subtitle: r.teaser,
                  meta: longDate(c, r.date),
                  badge: reports.categories[r.category as keyof typeof reports.categories],
                  level: 2,
                }),
              ),
              3,
            ),
            pagination({
              current: page,
              total: pages,
              href: paths.reportsPage,
              label: ui.newsPages,
              previousLabel: ui.newsPreviousPage,
              nextLabel: ui.newsNextPage,
            }),
          ],
          'elements',
        ),
      }),
  );
};

// A report: lead, first photo and text with its facts beside, the other photos below, then the way on.
export const reportPage = (slug: string, c: Content = content()): string => {
  const { reports, photos, ui } = c;
  const i = reports.items.findIndex((r) => r.slug === slug);
  const r = reports.items[i];
  const older = reports.items[i + 1];
  const [first, ...rest] = r.photos.map((name) => photos[name as PhotoName]);
  return chrome(
    c,
    3,
    header(c, r.title, [[reports.title, paths.reports]]) +
      section({
        content: split(
          stack(
            [
              `<p class="type-lead">${esc(r.teaser)}</p>`,
              figure({ images: [first], caption: first.caption ?? '', labels: lightbox(c) }),
              richText({ html: paragraphs(r.text) }),
            ],
            'column',
          ),
          factList({
            facts: [
              { label: ui.newsDate, value: longDate(c, r.date) },
              { label: ui.newsCategory, value: reports.categories[r.category as keyof typeof reports.categories] },
              { label: ui.newsTags, value: r.tags.join(ui.newsListSeparator) },
            ],
          }),
          'content-sidebar',
        ),
      }) +
      section({
        tone: 'sunk',
        content: stack([sectionHeading({ title: ui.newsPhotos }), gallery({ images: rest, labels: lightbox(c) })], 'heading'),
      }) +
      section({
        content: cluster([
          link({ label: ui.newsAll, href: paths.reports, direction: 'back' }),
          ...(older ? [link({ label: `${ui.newsNext}: ${older.title}`, href: paths.report(older.slug) })] : []),
        ]),
      }),
  );
};

// The demo's form with every EXT:form element type; the other steps are in Molecules/Form.
// Each step of the form is a state of the same page, as TYPO3 shows it after "Next".
export const registerPage = (c: Content = content(), step: WalkFormStep = 0): string =>
  chrome(
    c,
    1,
    header(c, c.walkForm.title, [[c.site.practical.title, paths.practical]]) +
      section({ content: split(walkForm(c, step), '', 'content-sidebar') }),
  );

// The components no other page uses, given a place of their own: a place, the ways to walk the route and the hosts.
export const waysPage = (c: Content = content()): string => {
  const { kumano, guide, pages, ui, site } = c;
  const yunomine = kumano.places[1];
  return chrome(
    c,
    1,
    header(c, site.ways.title, [[site.practical.title, paths.practical]]) +
      section({
        content: textMedia({
          image: yunomine.image,
          title: yunomine.title,
          text: yunomine.description,
          link: { label: ui.readMore, href: paths.route },
        }),
      }) +
      section({
        content: split(
          mediaList({
            title: pages.start.panelTitle,
            items: guide.routes,
            more: { label: pages.start.panelMore, href: paths.days },
          }),
          grid(guide.hosts.map(personCard), 2),
          'even',
        ),
      }),
  );
};

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

// The contact page's form, also on the content showcase.
const contactForm = (c: Content): string => {
  const { ui, site } = c;
  const topics = practicalSlugs.map((slug) => site.practical.pages[slug].title);
  return form({
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
  });
};

export const contactPage = (c: Content = content()): string => {
  const contact = c.guide.footer.columns[c.guide.footer.columns.length - 1];
  return chrome(
    c,
    -1,
    header(c, contact.title, []) +
      section({
        content: split(contactForm(c), richText({ html: `<p>${esc(contact.links[1].label)}</p>` }), 'content-sidebar'),
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

// Every content element in every form it takes, one below the other, from the journal's own texts and photos. The
// page top variants that set the page's h1 (photo hero, slides, opener, the columns' page top) show on their own pages.
export const showcasePage = (c: Content = content()): string => {
  const { site, kumano, guide, home, pages, photos, ui, reports } = c;
  const s = site.showcase;
  const e = s.elements;
  const v = s.variants;
  // The hero's buttons lead to sections of At a glance.
  const glanceHero = {
    ...kumano.hero,
    actions: kumano.hero.actions.map((a) => ({ ...a, href: a.href.startsWith('#') ? `${paths.glance}${a.href}` : a.href })),
  };
  const slides = heroSlidesOf(c);
  const practicalNav = practicalSlugs.map((slug) => ({ label: site.practical.pages[slug].title, href: paths.practicalPage(slug) }));
  const blocks: {
    id: string;
    element: string;
    variant?: string;
    title?: string;
    body: string;
    tone?: 'sunk';
    bleed?: boolean;
    raw?: boolean;
    ownHeading?: boolean;
  }[] = [
    // Both come under a heading of the page, so their titles step down to h2.
    { id: 'hero', element: e.pageTop, variant: v.hero, raw: true, body: hero({ ...glanceHero, level: 2 }) },
    {
      id: 'hero-slides',
      element: e.pageTop,
      variant: v.heroSlides,
      raw: true,
      body: heroSlides({ ...slides, slides: [glanceHero, ...slides.slides.slice(1)], level: 2 }),
    },
    { id: 'text', element: e.text, variant: v.text, body: richText({ html: paragraphs(kumano.intro) }) },
    { id: 'table', element: e.text, variant: v.table, body: richText({ html: stagesTable(c) }) },
    {
      id: 'image-left',
      element: e.textImage,
      variant: v.imageLeft,
      body: textMedia({
        ...kumano.places[1],
        text: kumano.places[1].description,
        link: { label: ui.readMore, href: paths.place('yunomine') },
      }),
    },
    {
      id: 'image-right',
      element: e.textImage,
      variant: v.imageRight,
      body: textMedia({
        ...kumano.places[2],
        text: kumano.places[2].description,
        imageSide: 'right',
        link: { label: ui.readMore, href: paths.place('chikatsuyu') },
      }),
    },
    {
      id: 'long-text',
      element: e.textImage,
      variant: v.longText,
      body: textMedia({ image: photos['cedar-canopy'], title: home.why.title, text: kumano.intro.join(' ') }),
    },
    {
      id: 'video',
      element: e.textImage,
      variant: v.video,
      body: textMedia({
        image: asVideo(photos['sea-of-clouds']),
        title: kumano.days[1].route,
        text: kumano.days[1].description,
        play: ui.playVideo,
      }),
    },
    {
      id: 'figure',
      element: e.images,
      variant: v.figure,
      body: figure({ images: [photos['forest-stream']], caption: home.bridgeCaption, labels: lightbox(c) }),
    },
    {
      id: 'figure-plain',
      element: e.images,
      variant: v.figurePlain,
      body: figure({ images: [photos['misty-valley'], photos['root-path']], caption: '', rule: false, labels: lightbox(c) }),
    },
    {
      id: 'gallery',
      element: e.images,
      variant: v.gallery,
      body: gallery({ images: photosOfDay(1).map((name) => photos[name]), labels: lightbox(c) }),
    },
    {
      id: 'fullwidth',
      element: e.images,
      variant: v.fullwidth,
      raw: true,
      body: bleedImage(photos['evening-rooftops'], undefined, lightbox(c)),
    },
    { id: 'teaser', element: e.cards, variant: v.teaser, body: grid(teasers(dayTeasers(c)), 4) },
    {
      id: 'place',
      element: e.cards,
      variant: v.place,
      body: split(featureCard(kumano.places[0]), featureCard(kumano.places[1]), 'wide-narrow'),
    },
    { id: 'person', element: e.cards, variant: v.person, body: grid(guide.hosts.map(personCard), 2) },
    {
      id: 'cta',
      element: e.cards,
      variant: v.cta,
      body: grid(
        guide.prep.map((p) => ctaCard({ ...p, linkLabel: ui.readMore })),
        3,
      ),
      tone: 'sunk',
    },
    { id: 'tile', element: e.cards, variant: v.tile, body: grid(guide.tiles.map(linkTile), 2) },
    {
      id: 'stage',
      element: e.cards,
      variant: v.stage,
      bleed: true,
      body: slider({
        heading: { eyebrow: e.cards, title: v.stage },
        items: kumano.stages.map(portraitCard),
        labels: { previous: ui.previous, next: ui.next, item: ui.card },
      }),
    },
    {
      id: 'media',
      element: e.list,
      variant: v.media,
      body: mediaList({ title: pages.start.panelTitle, items: guide.routes, more: { label: pages.start.panelMore, href: paths.days } }),
    },
    { id: 'days', element: e.list, variant: v.days, body: timeline(kumano.days) },
    { id: 'downloads', element: e.list, variant: v.downloads, body: downloadList({ items: pages.detail.downloads }) },
    { id: 'links', element: e.list, variant: v.links, body: cluster(practicalNav.map((l) => link(l))) },
    { id: 'links-stacked', element: e.list, variant: v.linksStacked, body: stack(practicalNav.map((l) => link(l))) },
    { id: 'subnav', element: e.list, variant: v.subnav, body: subNav({ title: site.practical.title, items: practicalNav }) },
    { id: 'figures', element: e.facts, variant: v.figures, body: statRow(kumano.stats) },
    { id: 'icons', element: e.facts, variant: v.icons, body: grid(guide.facts.map(iconFact), 4) },
    {
      id: 'pairs',
      element: e.facts,
      variant: v.pairs,
      body: factList({
        facts: kumano.days.map((d) => ({ label: d.date, value: d.route })),
      }),
    },
    { id: 'highlight', element: e.callout, variant: v.highlight, body: highlight(home.crow) },
    {
      id: 'infobox',
      element: e.callout,
      variant: v.infobox,
      body: infoBox({ title: site.day.tipTitle, text: site.day.tips[1], links: [{ label: site.practical.title, href: paths.practical }] }),
    },
    { id: 'notice', element: e.callout, variant: v.notice, body: notice(guide.footer.notice) },
    { id: 'quote', element: e.callout, variant: v.quote, body: quote(home.quote) },
    // The element sets its heading beside the questions, as on the practical page.
    {
      id: 'questions',
      element: e.questions,
      title: home.practical.title,
      ownHeading: true,
      body: split(sectionHeading({ eyebrow: e.questions, title: home.practical.title }), faqList(kumano.faq), 'heading-content'),
    },
    ...(['even', 'content-sidebar', 'text-media', 'heading-content', 'wide-narrow', 'narrow-wide'] as const).map((ratio) => ({
      id: `columns-${ratio}`,
      element: e.columns,
      variant: v[ratio.replace(/-(\w)/g, (_, l: string) => l.toUpperCase()) as 'even'],
      body: split(richText({ html: `<p>${esc(kumano.intro[0])}</p>` }), richText({ html: `<p>${esc(kumano.intro[1])}</p>` }), ratio),
    })),
    { id: 'section-sunk', element: e.section, variant: v.sunk, tone: 'sunk', body: richText({ html: paragraphs([site.days.intro]) }) },
    {
      id: 'newsletter',
      element: e.newsletter,
      title: home.newsletter.title,
      body: split(
        richText({ html: `<p>${esc(home.newsletter.text)}</p>` }),
        newsletterForm({
          action: '#',
          emailLabel: ui.emailAddress,
          placeholder: ui.emailPlaceholder,
          consent: ui.consent,
          submit: ui.subscribe,
        }),
        'text-media',
      ),
    },
    {
      id: 'external-videos',
      element: e.media,
      title: ui.mediaConsentTitle,
      body: mediaConsent({ text: ui.mediaConsentText, toggle: ui.mediaConsentToggle }),
    },
    { id: 'route-map', element: e.journal, variant: v.routeMap, body: routeMap(linkRoute(kumano.route)) },
    {
      id: 'chapter',
      element: e.journal,
      variant: v.chapter,
      body: chapter({
        id: 'showcase-chapter-day-2',
        number: '1',
        date: `${kumano.days[1].date} · ${kumano.days[1].time}`,
        title: kumano.days[1].route,
        text: home.draft.chapters[1],
        photos: dayPhotos[1].map(([name, span, shift]) => ({ image: photos[name], span, shift })),
        labels: lightbox(c),
      }),
    },
    { id: 'form', element: e.plugins, variant: v.form, body: split(contactForm(c), '', 'content-sidebar') },
    {
      id: 'login',
      element: e.plugins,
      variant: v.login,
      body: split(loginForm({ action: paths.login, labels: loginLabels(c) }), '', 'content-sidebar'),
    },
    {
      id: 'search',
      element: e.plugins,
      variant: v.search,
      body: searchForm({
        action: paths.search,
        label: ui.search,
        submit: ui.search,
        placeholder: ui.searchPlaceholder,
        landmark: ui.searchResults,
      }),
    },
    {
      id: 'news',
      element: e.plugins,
      variant: v.news,
      body: grid(
        reports.items.slice(0, 3).map((r) =>
          teaserCard({
            image: photos[r.photos[0] as PhotoName],
            title: r.title,
            href: paths.report(r.slug),
            subtitle: r.teaser,
            meta: longDate(c, r.date),
            badge: reports.categories[r.category as keyof typeof reports.categories],
            level: 3,
          }),
        ),
        3,
      ),
    },
  ];
  const anchor = (id: string) => `showcase-${id}`;
  return chrome(
    c,
    1,
    // The page top "Title and text" carries the page's h1.
    section({
      content: `<h1 class="type-h2">${esc(s.title)}</h1><p class="type-lead">${esc(s.intro)}</p>`,
    }) +
      section({
        space: 'flush-top',
        content: stack(
          [
            sectionHeading({ title: s.contents }),
            linkGroups({
              groups: [...new Set(blocks.map((b) => b.element))].map((title) => ({
                title,
                links: blocks
                  .filter((b) => b.element === title)
                  .map((b) => ({ label: b.variant ?? b.title ?? title, href: `#${anchor(b.id)}` })),
              })),
            }),
          ],
          'heading',
        ),
      }) +
      blocks
        .map((b) =>
          b.raw
            ? // As in TYPO3, where a header element stands before the full-width element.
              section({ id: anchor(b.id), content: sectionHeading({ eyebrow: b.element, title: b.variant ?? '' }) }) + b.body
            : section({
                id: anchor(b.id),
                tone: b.tone,
                bleed: b.bleed,
                content:
                  b.bleed || b.ownHeading
                    ? b.body
                    : stack([sectionHeading({ eyebrow: b.element, title: b.title ?? b.variant ?? '' }), b.body], 'heading'),
              }),
        )
        .join(''),
  );
};
