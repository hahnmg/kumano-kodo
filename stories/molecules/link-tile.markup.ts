import { attrs, esc } from '../../src/lib/html';
import { icon, type IconName } from '../atoms/icon.markup';
import { iconCircle } from '../atoms/icon-circle.markup';

export interface LinkTileProps {
  title: string;
  href: string;
  icon: IconName;
}

export const linkTile = ({ title, href, icon: iconName }: LinkTileProps): string =>
  `<a${attrs({ class: 'link-tile', href })}>${iconCircle({ name: iconName })}` +
  `<span class="link-tile-title type-h4">${esc(title)}</span>${icon({ name: 'arrow-right' })}</a>`;
