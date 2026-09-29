import { esc, img, type Image } from '../../src/lib/html';

export interface FigureProps {
    images: [Image] | [Image, Image];
    caption: string;
}

export const figure = ({ images, caption }: FigureProps): string =>
    `<figure class="figure figure--${images.length === 2 ? 'pair' : 'default'}">` +
    `<div class="figure__images">${images.map((i) => img(i, 'figure__image')).join('')}</div>` +
    `<figcaption class="figure__caption type-caption">${esc(caption)}</figcaption></figure>`;
