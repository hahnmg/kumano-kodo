import { attrs, esc } from '../../src/lib/html';

export interface SubNavProps {
    title: string;
    items: { label: string; href: string; active?: boolean }[];
}

export const subNav = ({ title, items }: SubNavProps): string =>
    `<nav${attrs({ class: 'sub-nav', 'aria-label': title })}><h2 class="sub-nav-title type-h4">${esc(title)}</h2><ul class="sub-nav-list">` +
    items
        .map(
            (i) =>
                `<li><a${attrs({ class: 'sub-nav-link type-small', href: i.href, 'aria-current': i.active ? 'page' : undefined })}>${esc(i.label)}</a></li>`,
        )
        .join('') +
    `</ul></nav>`;
