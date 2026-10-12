import { attrs, cx, esc, type Image } from '../../src/lib/html';
import { lightboxGroupAttrs, type LightboxLabels } from '../../src/scripts/lightbox';
import { lightboxLink } from './gallery.markup';

export interface FigureProps {
    images: [Image] | [Image, Image];
    caption: string;
    rule?: boolean;
    labels?: Partial<LightboxLabels>;
}

export const figure = ({ images, caption, rule = true, labels }: FigureProps): string =>
    `<figure${attrs({ class: cx('figure', `figure-${images.length === 2 ? 'pair' : 'default'}`, !rule && 'figure-unruled'), ...lightboxGroupAttrs(labels) })}>` +
    `<div class="figure-images">${images.map((i) => lightboxLink(i, 'figure-image')).join('')}</div>` +
    `<figcaption class="figure-caption type-caption">${esc(caption)}</figcaption></figure>`;
