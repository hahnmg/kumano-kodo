import { attrs, esc, img, type Image } from '../../src/lib/html';
import { lightboxGroupAttrs, type LightboxLabels } from '../../src/scripts/lightbox';

// A photo across the full viewport width, the caption back in the page container.
export const bleedImage = (image: Image, caption = image.caption, labels?: Partial<LightboxLabels>): string =>
    `<figure${attrs({ class: 'bleed-image', ...lightboxGroupAttrs(labels) })}>` +
    `<a${attrs({ class: 'lightbox-link', href: image.full ?? image.src, 'data-lightbox': true, 'aria-haspopup': 'dialog' })}>${img(image, 'bleed-image-image', '100vw')}</a>` +
    (caption ? `<figcaption class="bleed-image-caption type-caption">${esc(caption)}</figcaption>` : '') +
    `</figure>`;
