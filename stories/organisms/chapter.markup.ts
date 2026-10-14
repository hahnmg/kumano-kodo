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
    `<figure${attrs({ class: `chapter-media-item chapter-media-item-${portrait ? 'portrait' : 'landscape'} chapter-media-item-shift-${shift}`, style: `--span: ${span}` })}>` +
    `<a${attrs({ class: 'lightbox-link', href: image.full ?? image.src, 'data-lightbox': true, 'aria-haspopup': 'dialog' })}>` +
    img(image, 'chapter-image', `(width <= 600px) ${portrait ? '50vw' : '100vw'}, calc(${span} / 12 * min(100vw, 1328px))`) +
    `</a>` +
    (image.caption ? `<figcaption class="chapter-caption type-caption">${esc(image.caption)}</figcaption>` : '') +
    `</figure>`
  );
};

// One day of the journal: numeral, date, route and a paragraph, then its photos in capture order.
export const chapter = ({ id, number, date, title, text, photos, labels }: ChapterProps): string =>
  `<section${attrs({ class: 'chapter', 'aria-labelledby': id })}><div class="chapter-inner">` +
  `<div class="chapter-head"><p class="chapter-number type-hero" aria-hidden="true">${esc(number)}</p>` +
  `<div class="chapter-text"><p class="chapter-date type-caption">${esc(date)}</p>` +
  `<h2${attrs({ id, class: 'chapter-title type-h3' })}>${esc(title)}</h2><p class="type-lead">${esc(text)}</p></div></div>` +
  `<div${attrs({ class: 'chapter-media', ...lightboxGroupAttrs(labels) })}>${photos.map(photo).join('')}</div>` +
  `</div></section>`;
