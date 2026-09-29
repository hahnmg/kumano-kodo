import { attrs } from '../../src/lib/html';

export type IconButtonDirection = 'previous' | 'next';

export interface IconButtonProps {
    direction: IconButtonDirection;
    label?: string;
}

const arrows: Record<IconButtonDirection, string> = {
    previous: 'M19 6H1m0 0 5-5M1 6l5 5',
    next: 'M1 6h18m0 0-5-5m5 5-5 5',
};

export const iconButton = ({ direction, label = direction === 'previous' ? 'Previous' : 'Next' }: IconButtonProps): string =>
    `<button${attrs({ class: 'icon-button', type: 'button', 'aria-label': label })}>` +
    `<svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true"><path d="${arrows[direction]}" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>` +
    `</button>`;
