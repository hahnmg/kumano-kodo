import { attrs, esc, img, type Image } from '../../src/lib/html';
import { lightboxGroupAttrs, type LightboxLabels } from '../../src/scripts/lightbox';

export interface GalleryProps {
    images: Image[];
    caption?: string;
    labels?: Partial<LightboxLabels>;
}

export const lightboxLink = (image: Image, className: string): string =>
    `<a${attrs({ class: 'lightbox-link', href: image.full ?? image.src, 'data-lightbox': true, 'aria-haspopup': 'dialog' })}>${img(image, className)}</a>`;

export const gallery = ({ images, caption, labels }: GalleryProps): string =>
    `<figure${attrs({ class: 'gallery', ...lightboxGroupAttrs(labels) })}><div class="gallery-grid">${images.map((i) => lightboxLink(i, 'gallery-image')).join('')}</div>` +
    (caption ? `<figcaption class="gallery-caption type-caption">${esc(caption)}</figcaption>` : '') +
    `</figure>`;
