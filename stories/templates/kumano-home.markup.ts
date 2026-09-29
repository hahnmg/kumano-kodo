import { sliderDots } from '../atoms/slider-dots.markup';
import { center, rail, section, split, stack } from '../layout/layout.markup';
import { dayList } from '../molecules/day-row.markup';
import { faqList } from '../molecules/faq-item.markup';
import { figure } from '../molecules/figure.markup';
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
import { kumano, photos } from './content';

export const kumanoHome = (): string =>
    siteHeader({ nav: kumano.nav, languages: kumano.languages }) +
    `<main>` +
    hero(kumano.hero) +
    section({
        content: stack(
            [
                sectionHeading({ eyebrow: 'Why this trail', title: 'A path in use for a thousand years' }),
                split(
                    richText({ html: kumano.intro.map((p) => `<p>${p}</p>`).join('') }),
                    figure({
                        images: [photos.steinbruecke],
                        caption: 'Between Takahara and Chikatsuyu a dozen dry-stone bridges cross the slope. Kilometre 14.',
                    }),
                    'text-media',
                ),
            ],
            64,
        ),
    }) +
    section({
        space: 'large',
        content: quote({
            quote: '“The rain is part of it. Whoever comes in sunshine sees a different trail.”',
            source: 'Host of the minshuku in Chikatsuyu',
        }),
    }) +
    section({
        space: 'flush-top',
        content: stack(
            [
                statRow(kumano.stats),
                stack(
                    [
                        sectionHeading({
                            title: 'How the four days went',
                            variant: 'with-aside',
                            aside: 'Walking times without breaks, measured by the clock rather than estimated.',
                        }),
                        dayList(kumano.days),
                    ],
                    56,
                ),
            ],
            96,
        ),
    }) +
    section({
        tone: 'sunk',
        bleed: true,
        label: 'Stages',
        content: stack(
            [
                sectionHeading({ eyebrow: 'Stages', title: 'Five sections you can walk on their own', variant: 'with-controls' }),
                rail(kumano.stages.map(stageCard)),
                center(sliderDots({ count: kumano.stages.length })),
            ],
            40,
        ),
    }) +
    section({
        content: stack(
            [
                sectionHeading({
                    eyebrow: 'Trail map',
                    title: 'Schematic, not to scale',
                    variant: 'with-aside',
                    aside: 'The order of the stations and the day boundaries are accurate, the geometry is not. For navigation you need the tourism office map.',
                }),
                routeMap(kumano.route),
            ],
            56,
        ),
    }) +
    section({
        space: 'flush-top',
        content: stack(
            [
                sectionHeading({ eyebrow: 'Along the way', title: 'Three places worth the detour' }),
                split(placeCard(kumano.places[0]), placeCard(kumano.places[1]), 'wide-narrow'),
                split(
                    placeCard(kumano.places[2]),
                    figure({
                        images: [photos.krabbe, photos.nebelbaum],
                        caption: 'Notes from the roadside. A land crab after the rain, a cedar in the mist.',
                    }),
                    'narrow-wide',
                ),
            ],
            64,
        ),
    }) +
    section({
        tone: 'sunk',
        content: split(
            stack(
                [
                    sectionHeading({ eyebrow: 'Practical', title: 'What I wish I had known' }),
                    richText({ html: '<p>The four questions I have been asked most often since coming back.</p>' }),
                ],
                16,
            ),
            faqList(kumano.faq),
            'heading-content',
        ),
    }) +
    section({
        content: split(
            stack(
                [
                    sectionHeading({ title: 'Two emails a year, whenever a new route is written up' }),
                    richText({
                        html: '<p>Next up is the Kohechi, the mountain path from Koyasan to Hongu. No marketing, no sharing of your address.</p>',
                    }),
                ],
                16,
            ),
            newsletterForm({ action: '#' }),
            'text-media',
        ),
    }) +
    `</main>` +
    siteFooter(kumano.footer);
