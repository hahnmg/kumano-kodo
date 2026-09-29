import { attrs, cx, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';
import { logo } from '../atoms/logo.markup';
import { menuButton } from '../atoms/menu-button.markup';
import { schemeToggle } from '../atoms/scheme-toggle.markup';
import { navFlyout, type NavMenu } from '../molecules/nav-flyout.markup';

export type { NavLink, NavMenu } from '../molecules/nav-flyout.markup';

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

// Items with a menu are disclosure buttons (src/scripts/nav-flyout.ts); the others stay plain links.
export const navItem = ({ label, href, active, hasChildren, menu, open = false }: NavItem): string =>
    menu
        ? `<li${attrs({ class: cx('site-header__item', `site-header__item--${menu.kind}`), 'data-open': open })}>` +
          `<button${attrs({ class: 'site-header__link site-header__toggle type-small', type: 'button', 'aria-expanded': String(open), 'aria-current': active ? 'true' : undefined })}>` +
          `${esc(label)}${icon({ name: 'chevron-down', size: 14 })}</button>${navFlyout(menu)}</li>`
        : `<li class="site-header__item"><a${attrs({ class: 'site-header__link type-small', href, 'aria-current': active ? 'page' : undefined })}>${esc(label)}` +
          (hasChildren ? icon({ name: 'chevron-down', size: 14 }) : '') +
          `</a></li>`;

// The scheme button starts unpressed; src/scripts/scheme-toggle.ts keeps aria-pressed in step with the page.
export const siteHeader = ({ nav, languages = [], labels = {} }: SiteHeaderProps): string => {
    const l = { ...defaultLabels, ...labels };
    return (
        `<header class="site-header">${logo()}` +
        menuButton({ label: l.menu }) +
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
        schemeToggle({ label: l.scheme }) +
        `</div></div></header>`
    );
};
