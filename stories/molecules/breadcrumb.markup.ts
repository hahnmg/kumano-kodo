import { attrs, esc } from '../../src/lib/html';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    label?: string;
}

export const breadcrumb = ({ items, label = 'Breadcrumb' }: BreadcrumbProps): string =>
    `<nav${attrs({ class: 'breadcrumb', 'aria-label': label })}><ol class="breadcrumb-list type-small">` +
    items
        .map((item, i) =>
            i === items.length - 1
                ? `<li class="breadcrumb-item" aria-current="page">${esc(item.label)}</li>`
                : `<li class="breadcrumb-item"><a${attrs({ href: item.href ?? '#' })}>${esc(item.label)}</a></li>`,
        )
        .join('') +
    `</ol></nav>`;
