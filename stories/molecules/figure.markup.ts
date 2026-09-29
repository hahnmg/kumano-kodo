import { cx, esc, img, type Image } from '../../src/lib/html';

export interface FigureProps {
    images: [Image] | [Image, Image];
    caption: string;
    rule?: boolean;
}

export const figure = ({ images, caption, rule = true }: FigureProps): string =>
    `<figure class="${cx('figure', `figure--${images.length === 2 ? 'pair' : 'default'}`, !rule && 'figure--unruled')}">` +
    `<div class="figure__images">${images.map((i) => img(i, 'figure__image')).join('')}</div>` +
    `<figcaption class="figure__caption type-caption">${esc(caption)}</figcaption></figure>`;
