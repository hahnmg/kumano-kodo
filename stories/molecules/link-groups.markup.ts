import { attrs, esc } from '../../src/lib/html';
import { link, type LinkProps } from '../atoms/link.markup';

export interface LinkGroupsProps {
  groups: { title: string; links: LinkProps[] }[];
}

export const linkGroups = ({ groups }: LinkGroupsProps): string =>
  `<div class="link-groups">` +
  groups
    .map(
      (g) =>
        `<div class="link-group"><h3${attrs({ class: 'link-group-title type-label' })}>${esc(g.title)}</h3>` +
        `<ul class="link-group-list">${g.links.map((l) => `<li>${link(l)}</li>`).join('')}</ul></div>`,
    )
    .join('') +
  `</div>`;
