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
import { personCard } from '../molecules/person-card.markup';
import { richText } from '../molecules/rich-text.markup';
import { sectionHeading } from '../molecules/section-heading.markup';
import { subNav } from '../molecules/sub-nav.markup';
import { teaserCard } from '../molecules/teaser-card.markup';
import { heroSplit } from '../organisms/hero-split.markup';
import { pageHeader } from '../organisms/page-header.markup';
import { siteFooter } from '../organisms/site-footer.markup';
import { siteHeader } from '../organisms/site-header.markup';
import { topbar } from '../organisms/topbar.markup';
import { demo, photos, richTextSample } from './content';

const chrome = (main: string): string =>
    topbar(demo.topbar) + siteHeader({ nav: demo.nav, themes: false }) + `<main>${main}</main>` + siteFooter(demo.footer);

const teasers = (count: number, level: 2 | 3 = 3) => demo.animals.slice(0, count).map((a) => teaserCard({ ...a, href: '#', level }));

export const startPage = (): string =>
    chrome(
        heroSplit({
            title: 'Ein Zuhause für Tiere, die eines suchen',
            text: 'Wir versorgen Hunde, Katzen und Kleintiere, bis sie ein neues Zuhause gefunden haben. Lernen Sie unsere Tiere kennen oder helfen Sie uns dabei, für sie da zu sein.',
            action: { label: 'Tiere kennenlernen', href: '#' },
            panel: { title: 'Tiere nach Art', items: demo.categories, more: { label: 'Alle Tiere ansehen', href: '#' } },
        }) +
            section({ label: 'Kontakt', content: grid(demo.facts.map(iconFact), 4) }) +
            section({
                space: 'flush-top',
                content: stack([sectionHeading({ title: 'Diese Tiere suchen ein Zuhause' }), grid(teasers(4), 4)], 56),
            }) +
            section({
                tone: 'sunk',
                content: stack(
                    [
                        sectionHeading({ title: 'So können Sie helfen' }),
                        grid(
                            demo.help.map((h) => ctaCard({ ...h, linkLabel: 'Mehr erfahren', href: '#' })),
                            3,
                        ),
                    ],
                    56,
                ),
            }) +
            section({
                content: stack(
                    [
                        sectionHeading({ title: 'Rat und Hilfe' }),
                        grid(
                            demo.tiles.map((t) => linkTile({ ...t, href: '#' })),
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
            title: 'Hunde',
            breadcrumb: [{ label: 'Start', href: '#' }, { label: 'Tiervermittlung', href: '#' }, { label: 'Hunde' }],
            chips: ['Hunde', 'Katzen', 'Kleintiere', 'Ältere Tiere', 'Vermittelte Tiere'].map((label, i) => ({
                label,
                href: '#',
                active: i === 0,
            })),
        }) +
            section({
                content: stack(
                    [
                        cluster([
                            searchField({ label: 'Nach Namen oder Rasse suchen', name: 'q', placeholder: 'z. B. Mischling' }),
                            select({ label: 'Geschlecht', name: 'sex', options: ['alle', 'männlich', 'weiblich'] }),
                            richText({ html: '<p>39 Tiere</p>' }),
                        ]),
                        grid(teasers(8, 2), 4),
                        center(pagination({ current: 1, total: 5, href: (p) => `?page=${p}` })),
                    ],
                    56,
                ),
            }),
    );

export const detailPage = (): string =>
    chrome(
        pageHeader({
            title: 'Bulldoggen Mischling',
            breadcrumb: [{ label: 'Start', href: '#' }, { label: 'Fundtiere', href: '#' }, { label: 'Fundhunde' }],
        }) +
            section({
                content: split(
                    stack(
                        [
                            figure({ images: [photos.steinbruecke], caption: 'Aufgenommen am Fundort.' }),
                            richText({ html: richTextSample }),
                            downloadList({
                                items: [
                                    { title: 'Tierabgabevertrag', meta: 'PDF · 240 KB', href: '#' },
                                    { title: 'Vermittlungsgebühren 2026', meta: 'PDF · 96 KB', href: '#' },
                                ],
                            }),
                        ],
                        40,
                    ),
                    stack(
                        [
                            factList({
                                title: 'Steckbrief',
                                facts: [
                                    { label: 'Gefunden am', value: '28.07.2026' },
                                    { label: 'Fundort', value: 'Musterstadt, Beispielstraße' },
                                ],
                            }),
                            infoBox({
                                title: 'Interesse an diesem Tier?',
                                text: 'Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie gern.',
                                links: [
                                    { label: '0000 000000', href: 'tel:0000000000' },
                                    { label: 'info@example.org', href: 'mailto:info@example.org' },
                                ],
                            }),
                            link({ label: 'Zurück zur Übersicht', href: '#', direction: 'back' }),
                        ],
                        40,
                    ),
                    'content-sidebar',
                ),
            }) +
            section({
                tone: 'sunk',
                label: 'Team',
                content: split(
                    subNav({
                        title: 'Über uns',
                        items: [
                            { label: 'Unser Team', href: '#', active: true },
                            { label: 'Kontakt', href: '#' },
                            { label: 'Ihr Weg zu uns', href: '#' },
                            { label: 'Jugendgruppe', href: '#' },
                        ],
                    }),
                    grid(demo.team.map(personCard), 4),
                    'heading-content',
                ),
            }),
    );
