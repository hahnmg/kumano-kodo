import { link } from '../atoms/link.markup';
import { searchField } from '../atoms/search-field.markup';
import { select } from '../atoms/select.markup';
import { center, cluster, grid, section, split, stack } from '../layout/layout.markup';
import { ctaCard } from '../molecules/cta-card.markup';
import { downloadList } from '../molecules/download-list.markup';
import { factList } from '../molecules/fact-list.markup';
import { figure } from '../molecules/figure.markup';
import { iconFact } from '../molecules/icon-fact.markup';
import { infoBox } from '../molecules/info-box.markup';
import { linkTile } from '../molecules/link-tile.markup';
import { pagination } from '../molecules/pagination.markup';
import { richText } from '../molecules/rich-text.markup';
import { sectionHeading } from '../molecules/section-heading.markup';
import { subNav } from '../molecules/sub-nav.markup';
import { teaserCard } from '../molecules/teaser-card.markup';
import { heroSplit } from '../organisms/hero-split.markup';
import { pageHeader } from '../organisms/page-header.markup';
import { siteFooter } from '../organisms/site-footer.markup';
import { siteHeader } from '../organisms/site-header.markup';
import { topbar } from '../organisms/topbar.markup';
import { content, type Content } from './content';

const chrome = ({ guide, languages, ui }: Content, main: string): string =>
    topbar({ ...guide.topbar, ariaLabel: ui.trailStatus }) +
    siteHeader({ nav: guide.nav, languages, labels: { nav: ui.mainNav, languages: ui.language, scheme: ui.darkMode, menu: ui.menu } }) +
    `<main>${main}</main>` +
    siteFooter(guide.footer);

const teasers = (entries: Content['guide']['entries'], level: 2 | 3 = 3) => entries.map((e) => teaserCard({ ...e, href: '#', level }));

export const startPage = (c: Content = content()): string => {
    const { guide, ui, pages } = c;
    const s = pages.start;
    return chrome(
        c,
        heroSplit({
            title: s.title,
            text: s.text,
            action: { label: s.action, href: '#' },
            panel: { title: s.panelTitle, items: guide.routes, more: { label: s.panelMore, href: '#' } },
        }) +
            section({ label: s.factsLabel, content: grid(guide.facts.map(iconFact), 4) }) +
            section({
                space: 'flush-top',
                content: stack([sectionHeading(s.stages), grid(teasers(guide.entries.slice(0, 4)), 4)], 56),
            }) +
            section({
                tone: 'sunk',
                content: stack(
                    [
                        sectionHeading(s.prep),
                        grid(
                            guide.prep.map((p) => ctaCard({ ...p, linkLabel: ui.readMore, href: '#' })),
                            3,
                        ),
                    ],
                    56,
                ),
            }) +
            section({
                content: stack(
                    [
                        sectionHeading({ title: s.plan }),
                        grid(
                            guide.tiles.map((t) => linkTile({ ...t, href: '#' })),
                            2,
                        ),
                    ],
                    40,
                ),
            }),
    );
};

export const listPage = (c: Content = content()): string => {
    const { guide, ui, pages } = c;
    const l = pages.list;
    return chrome(
        c,
        pageHeader({
            title: l.title,
            breadcrumb: [...l.crumbs.map((label) => ({ label, href: '#' })), { label: l.title }],
            chips: l.chips.map((label, i) => ({ label, href: '#', active: i === 0 })),
            chipsLabel: ui.categories,
            breadcrumbLabel: ui.breadcrumb,
        }) +
            section({
                content: stack(
                    [
                        cluster([
                            searchField({ label: l.search.label, name: 'q', placeholder: l.search.placeholder }),
                            select({ label: l.day.label, name: 'day', options: l.day.options }),
                            richText({ html: `<p>${l.count}</p>` }),
                        ]),
                        grid(teasers(guide.entries, 2), 4),
                        center(
                            pagination({
                                current: 1,
                                total: 2,
                                href: (p) => `?page=${p}`,
                                label: ui.pages,
                                previousLabel: ui.previousPage,
                                nextLabel: ui.nextPage,
                            }),
                        ),
                    ],
                    56,
                ),
            }),
    );
};

export const detailPage = (c: Content = content()): string => {
    const { guide, kumano, photos, richTextSample, ui, pages } = c;
    const d = pages.detail;
    const stage = kumano.stages[2];
    return chrome(
        c,
        pageHeader({
            title: stage.title,
            breadcrumb: [...d.crumbs.map((label) => ({ label, href: '#' })), { label: stage.title }],
            breadcrumbLabel: ui.breadcrumb,
        }) +
            section({
                content: split(
                    stack(
                        [
                            figure({
                                images: [photos['misty-valley']],
                                caption: d.caption,
                                rule: false,
                                labels: { close: ui.close, previous: ui.previous, next: ui.next },
                            }),
                            richText({ html: richTextSample }),
                            downloadList({ items: d.downloads.slice(0, 2) }),
                        ],
                        40,
                    ),
                    stack(
                        [
                            factList({ title: d.factsTitle, facts: d.facts }),
                            infoBox(d.info),
                            link({ label: d.back, href: '#', direction: 'back' }),
                        ],
                        40,
                    ),
                    'content-sidebar',
                ),
            }) +
            section({
                tone: 'sunk',
                label: d.along,
                content: split(
                    subNav({
                        title: d.subNavTitle,
                        items: kumano.stages.map((s, i) => ({ label: `${s.stage} · ${s.title}`, href: '#', active: i === 2 })),
                    }),
                    grid(teasers([guide.entries[1], guide.entries[3], guide.entries[6]]), 3),
                    'heading-content',
                ),
            }),
    );
};
