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
import { guide, kumano, photos, richTextSample } from './content';

const chrome = (main: string): string =>
    topbar(guide.topbar) + siteHeader({ nav: guide.nav, languages: kumano.languages }) + `<main>${main}</main>` + siteFooter(guide.footer);

const teasers = (entries: typeof guide.entries, level: 2 | 3 = 3) => entries.map((e) => teaserCard({ ...e, href: '#', level }));

export const startPage = (): string =>
    chrome(
        heroSplit({
            title: 'Four days on the Nakahechi',
            text: 'A private trail journal from May 2026: the stages, the places worth a detour and what I wish I had known before setting out.',
            action: { label: 'See the stages', href: '#' },
            panel: { title: 'Ways to walk it', items: guide.routes, more: { label: 'Compare the routes', href: '#' } },
        }) +
            section({ label: 'At a glance', content: grid(guide.facts.map(iconFact), 4) }) +
            section({
                space: 'flush-top',
                content: stack(
                    [
                        sectionHeading({ eyebrow: 'Stages', title: 'Four days, one stage each' }),
                        grid(teasers(guide.entries.slice(0, 4)), 4),
                    ],
                    56,
                ),
            }) +
            section({
                tone: 'sunk',
                content: stack(
                    [
                        sectionHeading({ eyebrow: 'Practical', title: 'Before you go' }),
                        grid(
                            guide.prep.map((p) => ctaCard({ ...p, linkLabel: 'Read more', href: '#' })),
                            3,
                        ),
                    ],
                    56,
                ),
            }) +
            section({
                content: stack(
                    [
                        sectionHeading({ title: 'Plan the walk' }),
                        grid(
                            guide.tiles.map((t) => linkTile({ ...t, href: '#' })),
                            2,
                        ),
                    ],
                    40,
                ),
            }),
    );

export const listPage = (): string =>
    chrome(
        pageHeader({
            title: 'Stages and places',
            breadcrumb: [{ label: 'Start', href: '#' }, { label: 'The route', href: '#' }, { label: 'Stages and places' }],
            chips: ['All', 'Stages', 'Places', 'Day trips'].map((label, i) => ({ label, href: '#', active: i === 0 })),
        }) +
            section({
                content: stack(
                    [
                        cluster([
                            searchField({ label: 'Search stages and places', name: 'q', placeholder: 'e.g. Hongu' }),
                            select({ label: 'Day', name: 'day', options: ['All days', 'Day 1', 'Day 2', 'Day 3', 'Day 4'] }),
                            richText({ html: '<p>12 entries</p>' }),
                        ]),
                        grid(teasers(guide.entries, 2), 4),
                        center(pagination({ current: 1, total: 2, href: (p) => `?page=${p}` })),
                    ],
                    56,
                ),
            }),
    );

export const detailPage = (): string =>
    chrome(
        pageHeader({
            title: 'Chikatsuyu → Hongu',
            breadcrumb: [
                { label: 'Start', href: '#' },
                { label: 'The route', href: '#' },
                { label: 'Stages', href: '#' },
                { label: 'Chikatsuyu → Hongu' },
            ],
        }) +
            section({
                content: split(
                    stack(
                        [
                            figure({ images: [photos.talblick], caption: 'Looking back over the valley before the climb. Day 3, 15 May.' }),
                            richText({ html: richTextSample }),
                            downloadList({
                                items: [
                                    { title: 'Stage map Chikatsuyu → Hongu', meta: 'PDF · 1,2 MB', href: '#' },
                                    { title: 'Bus timetable Hosshinmon – Hongu', meta: 'PDF · 96 KB', href: '#' },
                                ],
                            }),
                        ],
                        40,
                    ),
                    stack(
                        [
                            factList({
                                title: 'Stage facts',
                                facts: [
                                    { label: 'Day', value: 'Day 3 · 15 May' },
                                    { label: 'Distance', value: '25,9 km' },
                                    { label: 'Ascent', value: '+1 180 m' },
                                    { label: 'Walking time', value: '9:20 h' },
                                ],
                            }),
                            infoBox({
                                title: 'Split the stage?',
                                text: 'Catch the bus at Hosshinmon and walk only the last 7 km to Hongu.',
                                links: [
                                    { label: 'Bus timetable', href: '#' },
                                    { label: 'Stay in Chikatsuyu', href: '#' },
                                ],
                            }),
                            link({ label: 'All stages', href: '#', direction: 'back' }),
                        ],
                        40,
                    ),
                    'content-sidebar',
                ),
            }) +
            section({
                tone: 'sunk',
                label: 'Along the route',
                content: split(
                    subNav({
                        title: 'The route',
                        items: kumano.stages.map((s, i) => ({ label: `${s.stage} · ${s.title}`, href: '#', active: i === 2 })),
                    }),
                    grid(teasers([guide.entries[1], guide.entries[3], guide.entries[6]]), 3),
                    'heading-content',
                ),
            }),
    );
