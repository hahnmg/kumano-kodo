import { attrs, esc, type Image } from '../../src/lib/html';
import { avatar } from '../atoms/avatar.markup';
import { iconCircle } from '../atoms/icon-circle.markup';
import { link } from '../atoms/link.markup';

export interface MediaListProps {
  title: string;
  items: { image: Image; title: string; meta: string; href: string }[];
  more?: { label: string; href: string };
}

export const mediaList = ({ title, items, more }: MediaListProps): string =>
  `<section class="media-list"><h2 class="media-list-title type-label">${esc(title)}</h2><ul class="media-list-items">` +
  items
    .map(
      (i) =>
        `<li><a${attrs({ class: 'media-list-row', href: i.href })}>${avatar({ ...i.image, size: 'small' })}` +
        `<span class="media-list-text"><span class="type-h4">${esc(i.title)}</span><span class="media-list-meta type-caption">${esc(i.meta)}</span></span>` +
        `${iconCircle({ name: 'arrow-right' })}</a></li>`,
    )
    .join('') +
  `</ul>${more ? `<p class="media-list-more">${link(more)}</p>` : ''}</section>`;
