import { esc, img, type Image } from '../../src/lib/html';

export interface GalleryProps {
    images: Image[];
    caption?: string;
}

export const gallery = ({ images, caption }: GalleryProps): string =>
    `<figure class="gallery"><div class="gallery__grid">${images.map((i) => img(i, 'gallery__image')).join('')}</div>` +
    (caption ? `<figcaption class="gallery__caption type-caption">${esc(caption)}</figcaption>` : '') +
    `</figure>`;
