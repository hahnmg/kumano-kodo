import { attrs, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';
import { logo } from '../atoms/logo.markup';

export interface NavItem {
    label: string;
    href: string;
    active?: boolean;
    hasChildren?: boolean;
}

export interface SiteHeaderProps {
    nav: NavItem[];
    languages?: { code: string; href: string; active?: boolean }[];
    themes?: boolean;
}

const themeNames = ['caramel', 'forest', 'ocean', 'violet'];

export const navItem = ({ label, href, active, hasChildren }: NavItem): string =>
    `<li><a${attrs({ class: 'site-header__link type-small', href, 'aria-current': active ? 'page' : undefined })}>${esc(label)}` +
    (hasChildren ? icon({ name: 'chevron-down', size: 14 }) : '') +
    `</a></li>`;

export const siteHeader = ({ nav, languages = [], themes = true }: SiteHeaderProps): string =>
    `<header class="site-header">${logo()}` +
    `<nav class="site-header__nav" aria-label="Main navigation"><ul class="site-header__list">${nav.map(navItem).join('')}</ul></nav>` +
    `<div class="site-header__tools">` +
    (themes
        ? `<div class="site-header__themes" role="group" aria-label="Colour theme">` +
          themeNames
              .map(
                  (t) =>
                      `<button${attrs({ class: `site-header__theme site-header__theme--${t}`, type: 'button', 'data-theme-value': t, 'aria-label': t })}></button>`,
              )
              .join('') +
          `</div>`
        : '') +
    (languages.length
        ? `<ul class="site-header__languages" aria-label="Language">` +
          languages
              .map(
                  (l) =>
                      `<li><a${attrs({ class: 'type-label', href: l.href, 'aria-current': l.active ? 'true' : undefined })}>${esc(l.code)}</a></li>`,
              )
              .join('') +
          `</ul>`
        : '') +
    `<button class="site-header__scheme" type="button" aria-label="Light or dark"><span></span></button>` +
    `</div></header>`;
