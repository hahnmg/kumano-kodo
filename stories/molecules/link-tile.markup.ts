import { attrs, esc } from '../../src/lib/html';
import { icon, type IconName } from '../atoms/icon.markup';
import { iconCircle } from '../atoms/icon-circle.markup';

export interface LinkTileProps {
  title: string;
  href: string;
  icon: IconName;
  // A bar in the accent beside the tile instead of the rule above it.
  edge?: boolean;
}

export const linkTile = ({ title, href, icon: iconName, edge = false }: LinkTileProps): string =>
  `<a${attrs({ class: edge ? 'link-tile link-tile-edge' : 'link-tile', href })}>${iconCircle({ name: iconName })}` +
  `<span class="link-tile-title type-h4">${esc(title)}</span>${icon({ name: 'arrow-right' })}</a>`;
