import { esc, type Image } from '../../src/lib/html';
import { avatar } from '../atoms/avatar.markup';

export interface PersonCardProps {
    image: Image;
    name: string;
    role: string;
    focus?: string;
}

export const personCard = ({ image, name, role, focus }: PersonCardProps): string =>
    `<article class="person-card">${avatar({ ...image, size: 'large' })}` +
    `<h3 class="person-card-name type-h4">${esc(name)}</h3>` +
    `<p class="person-card-role type-small">${esc(role)}</p>` +
    (focus ? `<p class="person-card-focus type-small">${esc(focus)}</p>` : '') +
    `</article>`;
