import { esc, img, type Image } from '../../src/lib/html';
import { link } from '../atoms/link.markup';

export interface TextMediaProps {
    image: Image;
    title: string;
    text: string;
    link?: { label: string; href: string };
    imageSide?: 'left' | 'right';
}

export const textMedia = ({ image, title, text, link: more, imageSide = 'left' }: TextMediaProps): string =>
    `<div class="text-media text-media--image-${imageSide}">${img(image, 'text-media__image')}` +
    `<div class="text-media__text"><h2 class="type-h3">${esc(title)}</h2><p class="text-media__body type-body">${esc(text)}</p>` +
    (more ? `<p>${link(more)}</p>` : '') +
    `</div></div>`;
