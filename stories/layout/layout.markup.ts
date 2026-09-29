import { attrs, cx } from '../../src/lib/html';

export type SectionTone = 'paper' | 'sunk';
export type SectionSpace = 'default' | 'large' | 'flush-top' | 'none';

export interface SectionProps {
    content: string;
    tone?: SectionTone;
    space?: SectionSpace;
    label?: string;
    bleed?: boolean;
}

// bleed lets rails scroll to the viewport edge instead of stopping at the gutter.
export const section = ({ content, tone = 'paper', space = 'default', label, bleed = false }: SectionProps): string =>
    `<section${attrs({ class: cx('section', `section--${tone}`, `section--space-${space}`, bleed && 'section--bleed'), 'aria-label': label })}>` +
    `<div class="section__inner">${content}</div></section>`;

export const stack = (items: string[], gap: 16 | 24 | 40 | 56 | 64 | 96 = 40): string =>
    `<div class="stack" style="--stack-gap: var(--space-${gap})">${items.join('')}</div>`;

export const grid = (items: string[], columns: 2 | 3 | 4): string => `<div class="grid grid--${columns}">${items.join('')}</div>`;

export type SplitRatio = 'content-sidebar' | 'text-media' | 'heading-content' | 'wide-narrow' | 'narrow-wide' | 'even';

export const split = (first: string, second: string, ratio: SplitRatio = 'even', align: 'start' | 'center' | 'end' = 'start'): string =>
    `<div class="split split--${ratio} split--align-${align}"><div>${first}</div><div>${second}</div></div>`;

export const rail = (items: string[]): string => `<div class="rail">${items.join('')}</div>`;

export const center = (content: string): string => `<div class="center">${content}</div>`;

export const cluster = (items: string[]): string => `<div class="cluster">${items.join('')}</div>`;
