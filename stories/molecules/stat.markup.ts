import { esc } from '../../src/lib/html';

export type StatVariant = 'large' | 'on-image';

export interface StatProps {
    value: string;
    label: string;
    variant?: StatVariant;
}

export const stat = ({ value, label, variant = 'large' }: StatProps): string =>
    variant === 'large'
        ? `<div class="stat stat-large"><p class="stat-value type-stat">${esc(value)}</p><p class="stat-label type-caption">${esc(label)}</p></div>`
        : `<div class="stat stat-on-image"><p class="stat-label type-label">${esc(label)}</p><p class="stat-value type-h3-regular">${esc(value)}</p></div>`;

export const statRow = (stats: StatProps[]): string =>
    `<div class="stat-row">${stats.map((s) => stat({ ...s, variant: 'large' })).join('')}</div>`;
