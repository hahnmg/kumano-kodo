import { attrs, esc, img, type Image } from '../../src/lib/html';
import { lightboxGroupAttrs, type LightboxLabels } from '../../src/scripts/lightbox';

export interface ChapterPhoto {
    image: Image;
    // Columns of twelve; shift lowers the photo by one or two steps so rows do not line up.
    span: number;
    shift?: 0 | 1 | 2;
}

export interface ChapterProps {
    id: string;
    number: string;
    date: string;
    title: string;
    text: string;
    photos: ChapterPhoto[];
    labels?: Partial<LightboxLabels>;
}

const photo = ({ image, span, shift = 0 }: ChapterPhoto): string => {
    const portrait = (image.height ?? 0) > (image.width ?? 0);
    return (
        `<figure${attrs({ class: `chapter__photo chapter__photo--${portrait ? 'portrait' : 'landscape'} chapter__photo--shift-${shift}`, style: `--span: ${span}` })}>` +
        `<a${attrs({ class: 'lightbox-link', href: image.full ?? image.src, 'data-lightbox': true, 'aria-haspopup': 'dialog' })}>` +
        img(image, 'chapter__image', `(width <= 600px) ${portrait ? '50vw' : '100vw'}, calc(${span} / 12 * min(100vw, 1328px))`) +
        `</a>` +
        (image.caption ? `<figcaption class="chapter__caption type-caption">${esc(image.caption)}</figcaption>` : '') +
        `</figure>`
    );
};

// One day of the journal: numeral, date, route and a paragraph, then its photos in capture order.
export const chapter = ({ id, number, date, title, text, photos, labels }: ChapterProps): string =>
    `<section${attrs({ class: 'chapter', 'aria-labelledby': id })}><div class="chapter__inner">` +
    `<div class="chapter__head"><p class="chapter__number type-hero" aria-hidden="true">${esc(number)}</p>` +
    `<div class="chapter__text"><p class="chapter__date type-caption">${esc(date)}</p>` +
    `<h2${attrs({ id, class: 'chapter__title type-h3' })}>${esc(title)}</h2><p class="type-lead">${esc(text)}</p></div></div>` +
    `<div${attrs({ class: 'chapter__photos', ...lightboxGroupAttrs(labels) })}>${photos.map(photo).join('')}</div>` +
    `</div></section>`;
