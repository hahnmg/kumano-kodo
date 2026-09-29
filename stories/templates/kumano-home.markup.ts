import { section, split, stack } from '../layout/layout.markup';
import { dayList } from '../molecules/day-row.markup';
import { faqList } from '../molecules/faq-item.markup';
import { figure } from '../molecules/figure.markup';
import { highlight } from '../molecules/highlight.markup';
import { newsletterForm } from '../molecules/newsletter-form.markup';
import { placeCard } from '../molecules/place-card.markup';
import { quote } from '../molecules/quote.markup';
import { richText } from '../molecules/rich-text.markup';
import { sectionHeading } from '../molecules/section-heading.markup';
import { stageCard } from '../molecules/stage-card.markup';
import { statRow } from '../molecules/stat.markup';
import { hero } from '../organisms/hero.markup';
import { routeMap } from '../organisms/route-map.markup';
import { siteFooter } from '../organisms/site-footer.markup';
import { siteHeader } from '../organisms/site-header.markup';
import { slider } from '../organisms/slider.markup';
import { content, type Content } from './content';

export const kumanoHome = ({ kumano, photos, home, ui, languages }: Content = content()): string => {
    const lightbox = { close: ui.close, previous: ui.previous, next: ui.next };
    return (
        siteHeader({
            nav: kumano.nav,
            languages,
            labels: { nav: ui.mainNav, languages: ui.language, scheme: ui.darkMode, menu: ui.menu },
        }) +
        `<main>` +
        hero(kumano.hero) +
        section({
            content: stack(
                [
                    sectionHeading(home.why),
                    split(
                        richText({ html: kumano.intro.map((p) => `<p>${p}</p>`).join('') }),
                        figure({ images: [photos['forest-stream']], caption: home.bridgeCaption, labels: lightbox }),
                        'text-media',
                    ),
                ],
                64,
            ),
        }) +
        section({ tone: 'sunk', content: highlight(home.crow) }) +
        section({
            space: 'large',
            content: quote(home.quote),
        }) +
        section({
            space: 'flush-top',
            content: stack(
                [statRow(kumano.stats), stack([sectionHeading({ ...home.days, variant: 'with-aside' }), dayList(kumano.days)], 56)],
                96,
            ),
        }) +
        section({
            tone: 'sunk',
            bleed: true,
            label: home.stages.eyebrow,
            id: 'stages',
            content: slider({
                heading: home.stages,
                items: kumano.stages.map(stageCard),
                labels: { previous: ui.previous, next: ui.next, item: ui.card },
            }),
        }) +
        section({
            content: stack([sectionHeading({ ...home.map, variant: 'with-aside' }), routeMap(kumano.route)], 56),
        }) +
        section({
            space: 'flush-top',
            content: stack(
                [
                    sectionHeading(home.places),
                    split(placeCard(kumano.places[0]), placeCard(kumano.places[1]), 'wide-narrow'),
                    split(
                        placeCard(kumano.places[2]),
                        figure({ images: [photos['land-crab'], photos['cedar-canopy']], caption: home.roadsideCaption, labels: lightbox }),
                        'narrow-wide',
                    ),
                ],
                64,
            ),
        }) +
        section({
            id: 'faq',
            tone: 'sunk',
            content: split(
                stack(
                    [
                        sectionHeading({ eyebrow: home.practical.eyebrow, title: home.practical.title }),
                        richText({ html: `<p>${home.practical.intro}</p>` }),
                    ],
                    16,
                ),
                faqList(kumano.faq),
                'heading-content',
            ),
        }) +
        section({
            content: split(
                stack([sectionHeading({ title: home.newsletter.title }), richText({ html: `<p>${home.newsletter.text}</p>` })], 16),
                newsletterForm({
                    action: '#',
                    emailLabel: ui.emailAddress,
                    placeholder: ui.emailPlaceholder,
                    consent: ui.consent,
                    submit: ui.subscribe,
                }),
                'text-media',
            ),
        }) +
        `</main>` +
        siteFooter(kumano.footer)
    );
};
