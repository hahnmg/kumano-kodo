import { attrs, esc } from '../../src/lib/html';

export interface PaginationProps {
    current: number;
    total: number;
    href: (page: number) => string;
    label?: string;
}

const pages = (current: number, total: number): (number | '…')[] => {
    const set = [...new Set([1, current - 1, current, current + 1, total])].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    return set.flatMap((p, i) => (i && p - set[i - 1] > 1 ? ['…' as const, p] : [p]));
};

export const pagination = ({ current, total, href, label = 'Seiten' }: PaginationProps): string => {
    const item = (content: string, target?: number, extra: Record<string, string> = {}) =>
        target
            ? `<li><a${attrs({ class: 'pagination__item type-button', href: href(target), ...extra })}>${content}</a></li>`
            : `<li><span class="pagination__item type-button" aria-hidden="true">${content}</span></li>`;
    return (
        `<nav${attrs({ class: 'pagination', 'aria-label': label })}><ol class="pagination__list">` +
        (current > 1 ? item('←', current - 1, { 'aria-label': 'Vorherige Seite' }) : '') +
        pages(current, total)
            .map((p) => (p === '…' ? item('…') : item(esc(p), p, p === current ? { 'aria-current': 'page' } : {})))
            .join('') +
        (current < total ? item('→', current + 1, { 'aria-label': 'Nächste Seite' }) : '') +
        `</ol></nav>`
    );
};
