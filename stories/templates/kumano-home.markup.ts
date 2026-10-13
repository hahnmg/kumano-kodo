import { skipLink } from '../atoms/skip-link.markup';
import { linkRoute } from '../content/paths';
import { section, split, stack } from '../layout/layout.markup';
import { timeline } from '../molecules/timeline-item.markup';
import { faqList } from '../molecules/faq-item.markup';
import { figure } from '../molecules/figure.markup';
import { highlight } from '../molecules/highlight.markup';
import { newsletterForm } from '../molecules/newsletter-form.markup';
import { featureCard } from '../molecules/feature-card.markup';
import { quote } from '../molecules/quote.markup';
import { richText } from '../molecules/rich-text.markup';
import { sectionHeading } from '../molecules/section-heading.markup';
import { portraitCard } from '../molecules/portrait-card.markup';
import { statRow } from '../molecules/stat.markup';
import { hero } from '../organisms/hero.markup';
import { routeMap } from '../organisms/route-map.markup';
import { siteFooter } from '../organisms/site-footer.markup';
import { siteHeader } from '../organisms/site-header.markup';
import { slider } from '../organisms/slider.markup';
import { content, type Content } from './content';

export const kumanoHome = ({ kumano, photos, home, ui, languages }: Content = content()): string => {
    const lightbox = { close: ui.close, previous: ui.previous, next: ui.next, play: ui.playVideo };
    return (
        skipLink({ label: ui.skipToContent }) +
        siteHeader({
            nav: kumano.nav,
            languages,
            labels: { nav: ui.mainNav, languages: ui.language, scheme: ui.darkMode, menu: ui.menu },
        }) +
        `<main id="main">` +
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
                'heading',
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
                [statRow(kumano.stats), stack([sectionHeading({ ...home.days, variant: 'with-aside' }), timeline(kumano.days)], 'heading')],
                'elements',
            ),
        }) +
        section({
            tone: 'sunk',
            bleed: true,
            label: home.stages.eyebrow,
            id: 'stages',
            content: slider({
                heading: home.stages,
                items: kumano.stages.map(portraitCard),
                labels: { previous: ui.previous, next: ui.next, item: ui.card },
            }),
        }) +
        section({
            content: stack([sectionHeading({ ...home.map, variant: 'with-aside' }), routeMap(linkRoute(kumano.route))], 'heading'),
        }) +
        section({
            space: 'flush-top',
            content: stack(
                [
                    sectionHeading(home.places),
                    stack(
                        [
                            split(featureCard(kumano.places[0]), featureCard(kumano.places[1]), 'wide-narrow'),
                            split(
                                featureCard(kumano.places[2]),
                                figure({
                                    images: [photos['land-crab'], photos['cedar-canopy']],
                                    caption: home.roadsideCaption,
                                    labels: lightbox,
                                }),
                                'narrow-wide',
                            ),
                        ],
                        'elements',
                    ),
                ],
                'heading',
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
        siteFooter({ ...kumano.footer, backToTop: ui.backToTop })
    );
};
