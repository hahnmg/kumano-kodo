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
  // A bar in the accent beside the card.
  edge?: boolean;
}

export const teaserCard = ({ image, title, href, subtitle, meta, badge: badgeLabel, level = 3, edge = false }: TeaserCardProps): string =>
  `<article class="teaser-card${edge ? ' teaser-card-edge' : ''}"><div class="teaser-card-media">${img(image, 'teaser-card-image', '(width <= 600px) 100vw, (width <= 900px) 50vw, 320px')}</div>` +
  `<div class="teaser-card-body">` +
  `<${level === 'none' ? 'p' : `h${level}`} class="teaser-card-title type-h4"><a${attrs({ href })}>${esc(title)}</a></${level === 'none' ? 'p' : `h${level}`}>` +
  (subtitle ? `<p class="teaser-card-subtitle type-small">${esc(subtitle)}</p>` : '') +
  (meta || badgeLabel
    ? `<div class="teaser-card-meta">${meta ? `<p class="type-caption">${esc(meta)}</p>` : ''}${badgeLabel ? badge({ label: badgeLabel }) : ''}</div>`
    : '') +
  `</div></article>`;
