import { attrs, cx, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';
import { link } from '../atoms/link.markup';
import { logo } from '../atoms/logo.markup';
import { richText } from '../molecules/rich-text.markup';
import { teaserCard, type TeaserCardProps } from '../molecules/teaser-card.markup';

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

export interface NavItem {
    label: string;
    href: string;
    active?: boolean;
    hasChildren?: boolean;
    menu?: NavMenu;
    open?: boolean;
}

export interface LanguageLink {
    code: string;
    locale: string;
    href: string;
    active?: boolean;
}

export interface SiteHeaderLabels {
    nav: string;
    languages: string;
    scheme: string;
    menu: string;
}

export interface SiteHeaderProps {
    nav: NavItem[];
    languages?: LanguageLink[];
    labels?: Partial<SiteHeaderLabels>;
}

const defaultLabels: SiteHeaderLabels = { nav: 'Main navigation', languages: 'Language', scheme: 'Dark mode', menu: 'Menu' };

const menuLinks = (links: NavLink[]): string =>
    `<ul class="site-header__menu-links">` +
    links
        .map(
            (l) =>
                `<li><a${attrs({ class: 'site-header__menu-link type-small', href: l.href, 'aria-current': l.active ? 'page' : undefined })}>${esc(l.label)}</a></li>`,
        )
        .join('') +
    `</ul>`;

const flyout = (menu: NavMenu): string =>
    menu.kind === 'dropdown'
        ? `<div class="site-header__flyout site-header__flyout--dropdown">${menuLinks(menu.links)}</div>`
        : `<div class="site-header__flyout site-header__flyout--mega"><div class="site-header__mega">` +
          menu.columns
              .map(
                  (c) =>
                      `<div class="site-header__mega-column"><p class="site-header__mega-title type-label">${esc(c.title)}</p>${menuLinks(c.links)}</div>`,
              )
              .join('') +
          (menu.text
              ? `<div class="site-header__mega-text"><p class="site-header__mega-title type-label">${esc(menu.text.title)}</p>${richText({ html: menu.text.html })}` +
                (menu.overview ? link({ label: menu.overview.label, href: menu.overview.href }) : '') +
                `</div>`
              : '') +
          (menu.teaser ? `<div class="site-header__mega-teaser">${teaserCard({ ...menu.teaser, level: 'none' })}</div>` : '') +
          `</div></div>`;

// Items with a menu are disclosure buttons (src/scripts/nav-flyout.ts); the others stay plain links.
export const navItem = ({ label, href, active, hasChildren, menu, open = false }: NavItem): string =>
    menu
        ? `<li${attrs({ class: cx('site-header__item', `site-header__item--${menu.kind}`), 'data-open': open })}>` +
          `<button${attrs({ class: 'site-header__link site-header__toggle type-small', type: 'button', 'aria-expanded': String(open), 'aria-current': active ? 'true' : undefined })}>` +
          `${esc(label)}${icon({ name: 'chevron-down', size: 14 })}</button>${flyout(menu)}</li>`
        : `<li class="site-header__item"><a${attrs({ class: 'site-header__link type-small', href, 'aria-current': active ? 'page' : undefined })}>${esc(label)}` +
          (hasChildren ? icon({ name: 'chevron-down', size: 14 }) : '') +
          `</a></li>`;

// The scheme button starts unpressed; src/scripts/scheme-toggle.ts keeps aria-pressed in step with the page.
export const siteHeader = ({ nav, languages = [], labels = {} }: SiteHeaderProps): string => {
    const l = { ...defaultLabels, ...labels };
    return (
        `<header class="site-header">${logo()}` +
        `<button${attrs({ class: 'site-header__menu', type: 'button', 'aria-label': l.menu, 'aria-expanded': 'false' })}><span class="site-header__bar"></span><span class="site-header__bar"></span></button>` +
        // Below 900px the panel collapses behind the menu button; above it, display: contents keeps the one-row header.
        `<div class="site-header__panel">` +
        `<nav class="site-header__nav" aria-label="${esc(l.nav)}"><ul class="site-header__list">${nav.map(navItem).join('')}</ul></nav>` +
        `<div class="site-header__tools">` +
        (languages.length
            ? `<ul class="site-header__languages" aria-label="${esc(l.languages)}">` +
              languages
                  .map(
                      (lang) =>
                          `<li><a${attrs({ class: 'type-label', href: lang.href, lang: lang.locale, hreflang: lang.locale, 'data-locale': lang.locale, 'aria-current': lang.active ? 'true' : undefined })}>${esc(lang.code)}</a></li>`,
                  )
                  .join('') +
              `</ul>`
            : '') +
        `<button${attrs({ class: 'site-header__scheme', type: 'button', 'aria-label': l.scheme, 'aria-pressed': 'false' })}><span></span></button>` +
        `</div></div></header>`
    );
};
