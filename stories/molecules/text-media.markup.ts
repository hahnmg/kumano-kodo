import { esc, img, type Image } from '../../src/lib/html';
import { link } from '../atoms/link.markup';

export interface TextMediaProps {
    image: Image;
    title: string;
    text: string | readonly string[];
    link?: { label: string; href: string };
    imageSide?: 'left' | 'right';
}

export const textMedia = ({ image, title, text, link: more, imageSide = 'left' }: TextMediaProps): string =>
    `<div class="text-media text-media-image-${imageSide}">${img(image, 'text-media-image')}` +
    `<div class="text-media-text"><h2 class="type-h3">${esc(title)}</h2>` +
    `<div class="text-media-body type-body">${[text]
        .flat()
        .map((t) => `<p>${esc(t)}</p>`)
        .join('')}</div>` +
    (more ? `<p>${link(more)}</p>` : '') +
    `</div></div>`;
