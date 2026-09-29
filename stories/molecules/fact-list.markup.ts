import { esc } from '../../src/lib/html';

export type FactListLayout = 'inline' | 'stacked';

export interface FactListProps {
    title?: string;
    facts: { label: string; value: string }[];
    layout?: FactListLayout;
}

export const factList = ({ title, facts, layout = 'inline' }: FactListProps): string =>
    `<div class="fact-list fact-list--${layout}">` +
    (title ? `<h2 class="fact-list__title type-h4">${esc(title)}</h2>` : '') +
    `<dl class="fact-list__items">` +
    facts
        .map(
            (f) =>
                `<div class="fact-list__row"><dt class="type-caption">${esc(f.label)}</dt><dd class="${layout === 'inline' ? 'type-small' : 'type-button'}">${esc(f.value)}</dd></div>`,
        )
        .join('') +
    `</dl></div>`;
