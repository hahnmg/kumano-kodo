import { attrs, esc } from '../../src/lib/html';
import { link } from '../atoms/link.markup';
import { richText } from './rich-text.markup';
import { teaserCard, type TeaserCardProps } from './teaser-card.markup';

export interface NavLink {
    label: string;
    href: string;
    active?: boolean;
}

export type NavMenu =
    | { kind: 'dropdown'; links: NavLink[] }
    | {
          kind: 'mega';
          columns: { title: string; links: NavLink[] }[];
          text?: { title: string; html: string };
          teaser?: Omit<TeaserCardProps, 'level'>;
          overview?: NavLink;
      };

const links = (items: NavLink[]): string =>
    `<ul class="nav-flyout__links">` +
    items
        .map(
            (l) =>
                `<li><a${attrs({ class: 'nav-flyout__link type-small', href: l.href, 'aria-current': l.active ? 'page' : undefined })}>${esc(l.label)}</a></li>`,
        )
        .join('') +
    `</ul>`;

// The panel under a nav item: a link list (dropdown) or a full-width panel with columns, text and a teaser (mega).
// The site header positions it and opens it; on its own it renders in place.
export const navFlyout = (menu: NavMenu): string =>
    menu.kind === 'dropdown'
        ? `<div class="nav-flyout nav-flyout--dropdown">${links(menu.links)}</div>`
        : `<div class="nav-flyout nav-flyout--mega"><div class="nav-flyout__grid">` +
          menu.columns
              .map(
                  (c) =>
                      `<div class="nav-flyout__column"><p class="nav-flyout__title type-label">${esc(c.title)}</p>${links(c.links)}</div>`,
              )
              .join('') +
          (menu.text
              ? `<div class="nav-flyout__text"><p class="nav-flyout__title type-label">${esc(menu.text.title)}</p>${richText({ html: menu.text.html })}` +
                (menu.overview ? link({ label: menu.overview.label, href: menu.overview.href }) : '') +
                `</div>`
              : '') +
          (menu.teaser ? `<div class="nav-flyout__teaser">${teaserCard({ ...menu.teaser, level: 'none' })}</div>` : '') +
          `</div></div>`;
