import { attrs, esc, img, type Image } from '../../src/lib/html';
import { badge } from '../atoms/badge.markup';

export interface TeaserCardProps {
    image: Image;
    title: string;
    href: string;
    subtitle?: string;
    meta?: string;
    badge?: string;
    // 'none' renders the title as a paragraph, for teasers inside navigation where a heading would break the outline.
    level?: 2 | 3 | 'none';
}

export const teaserCard = ({ image, title, href, subtitle, meta, badge: badgeLabel, level = 3 }: TeaserCardProps): string =>
    `<article class="teaser-card"><div class="teaser-card__media">${img(image, 'teaser-card__image', 314, 314)}</div>` +
    `<div class="teaser-card__body">` +
    `<${level === 'none' ? 'p' : `h${level}`} class="teaser-card__title type-h4"><a${attrs({ href })}>${esc(title)}</a></${level === 'none' ? 'p' : `h${level}`}>` +
    (subtitle ? `<p class="teaser-card__subtitle type-small">${esc(subtitle)}</p>` : '') +
    (meta || badgeLabel
        ? `<div class="teaser-card__meta">${meta ? `<p class="type-caption">${esc(meta)}</p>` : ''}${badgeLabel ? badge({ label: badgeLabel }) : ''}</div>`
        : '') +
    `</div></article>`;
