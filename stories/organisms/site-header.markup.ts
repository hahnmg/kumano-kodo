import { attrs, cx, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';
import { logo, type LogoProps } from '../atoms/logo.markup';
import { menuButton } from '../atoms/menu-button.markup';
import { schemeToggle } from '../atoms/scheme-toggle.markup';
import { navFlyout, type NavMenu } from '../molecules/nav-flyout.markup';
import { searchForm, type SearchFormProps } from '../molecules/search-form.markup';

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
    search?: SearchFormProps & { open?: boolean };
    logo?: LogoProps;
}

const defaultLabels: SiteHeaderLabels = { nav: 'Main navigation', languages: 'Language', scheme: 'Dark mode', menu: 'Menu' };

// Items with a menu are disclosure buttons (src/scripts/nav-flyout.ts); the others stay plain links.
export const navItem = ({ label, href, active, hasChildren, menu, open = false }: NavItem): string =>
    menu
        ? `<li${attrs({ class: cx('site-header-item', `site-header-item-${menu.kind}`), 'data-open': open })}>` +
          `<button${attrs({ class: 'site-header-link site-header-toggle type-small', type: 'button', 'aria-expanded': String(open), 'aria-current': active ? 'true' : undefined })}>` +
          `${esc(label)}${icon({ name: 'chevron-down', size: 14 })}</button>${navFlyout(menu)}</li>`
        : `<li class="site-header-item"><a${attrs({ class: 'site-header-link type-small', href, 'aria-current': active ? 'page' : undefined })}>${esc(label)}` +
          (hasChildren ? icon({ name: 'chevron-down', size: 14 }) : '') +
          `</a></li>`;

// The search is a disclosure like the nav flyouts; folded behind the menu button its form stands open at the top.
const searchItem = ({ open = false, ...form }: SearchFormProps & { open?: boolean }): string =>
    `<div${attrs({ class: 'site-header-item site-header-item-search', 'data-open': open })}>` +
    `<button${attrs({ class: 'site-header-toggle site-header-search-toggle', type: 'button', 'aria-expanded': String(open), 'aria-label': form.label })}>${icon({ name: 'search', size: 16 })}</button>` +
    `<div class="nav-flyout nav-flyout-search">${searchForm(form)}</div></div>`;

// The scheme button starts unpressed; src/scripts/scheme-toggle.ts keeps aria-pressed in step with the page.
export const siteHeader = ({ nav, languages = [], labels = {}, search, logo: brand }: SiteHeaderProps): string => {
    const l = { ...defaultLabels, ...labels };
    return (
        `<header class="site-header">${logo(brand)}` +
        menuButton({ label: l.menu }) +
        // Below 900px the panel collapses behind the menu button; above it, display: contents keeps the one-row header.
        `<div class="site-header-panel">` +
        (search ? searchItem(search) : '') +
        `<nav class="site-header-nav" aria-label="${esc(l.nav)}"><ul class="site-header-list">${nav.map(navItem).join('')}</ul></nav>` +
        `<div class="site-header-tools">` +
        (languages.length
            ? `<ul class="site-header-languages" aria-label="${esc(l.languages)}">` +
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
