import { section, split, stack } from '../layout/layout.markup';
import { faqList } from '../molecules/faq-item.markup';
import { highlight } from '../molecules/highlight.markup';
import { newsletterForm } from '../molecules/newsletter-form.markup';
import { richText } from '../molecules/rich-text.markup';
import { sectionHeading } from '../molecules/section-heading.markup';
import { bleedPhoto } from '../molecules/bleed-photo.markup';
import { chapter, type ChapterPhoto } from '../organisms/chapter.markup';
import { journalOpener } from '../organisms/journal-opener.markup';
import { routeMap } from '../organisms/route-map.markup';
import { siteFooter } from '../organisms/site-footer.markup';
import { siteHeader } from '../organisms/site-header.markup';
import { content, type Content } from './content';
import { dayPhotos } from './journal-photos';

// Editorial counter-proposal to Kumano Home: one chapter per day instead of repeated section formulas.
export const kumanoJournal = ({ kumano, photos, home, ui, languages }: Content = content()): string => {
    const labels = { close: ui.close, previous: ui.previous, next: ui.next };
    const d = home.draft;
    const chapters = dayPhotos.map((list, i) =>
        chapter({
            id: `day-${i + 1}`,
            number: String(i + 1),
            date: `${kumano.days[i].date} · ${kumano.days[i].time}`,
            title: kumano.days[i].route,
            text: d.chapters[i],
            photos: list.map(([name, span, shift]): ChapterPhoto => ({ image: photos[name], span, shift })),
            labels,
        }),
    );
    return (
        siteHeader({
            nav: kumano.nav.map((n) => ({ ...n, active: false })),
            languages,
            labels: { nav: ui.mainNav, languages: ui.language, scheme: ui.darkMode, menu: ui.menu },
        }) +
        `<main class="journal">` +
        journalOpener({
            kicker: d.kicker,
            title: d.title,
            lede: d.lede,
            meta: `${kumano.hero.eyebrow} · ${d.allPhotos}`,
            vertical: '熊野古道',
        }) +
        chapters[0] +
        bleedPhoto(photos['sea-of-clouds'], undefined, labels) +
        chapters[1] +
        section({ tone: 'sunk', content: highlight(home.crow) }) +
        chapters[2] +
        chapters[3] +
        bleedPhoto(photos['evening-rooftops'], `${d.coda} ${photos['evening-rooftops'].caption ?? ''}`, labels) +
        section({
            content: stack(
                [sectionHeading({ title: d.mapTitle, variant: 'with-aside', aside: home.map.aside }), routeMap(kumano.route)],
                56,
            ),
        }) +
        section({ tone: 'sunk', content: split(sectionHeading({ title: d.practicalTitle }), faqList(kumano.faq), 'heading-content') }) +
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
