import { attrs, cx } from '../../src/lib/html';

export type SectionTone = 'paper' | 'sunk';
export type SectionSpace = 'default' | 'large' | 'flush-top' | 'none';

export interface SectionProps {
  content: string;
  tone?: SectionTone;
  space?: SectionSpace;
  label?: string;
  bleed?: boolean;
  id?: string;
}

// bleed lets rails scroll to the viewport edge instead of stopping at the gutter.
export const section = ({ content, tone = 'paper', space = 'default', label, bleed = false, id }: SectionProps): string =>
  `<section${attrs({ class: cx('section', `section-${tone}`, `section-space-${space}`, bleed && 'section-bleed'), 'aria-label': label, id })}>` +
  `<div class="section-inner">${content}</div></section>`;

// Named gaps are the layout rule; numbers stay for spacing inside one component.
const namedGaps = { heading: '--section-heading-gap', elements: '--section-element-gap', column: '--column-element-gap' } as const;
export type StackGap = keyof typeof namedGaps | 16 | 24;

export const stack = (items: string[], gap: StackGap = 'column'): string =>
  `<div class="stack" style="--stack-gap: var(${typeof gap === 'number' ? `--space-${gap}` : namedGaps[gap]})">${items.join('')}</div>`;

export const grid = (items: string[], columns: 2 | 3 | 4): string => `<div class="grid grid-${columns}">${items.join('')}</div>`;

export type SplitRatio = 'content-sidebar' | 'text-media' | 'heading-content' | 'wide-narrow' | 'narrow-wide' | 'even';

// colour sets one column as a box in the accent; everything in it reads light on that ground.
export const split = (
  first: string,
  second: string,
  ratio: SplitRatio = 'even',
  align: 'start' | 'center' | 'end' = 'start',
  colour?: 'first' | 'second',
): string =>
  `<div class="${cx('split', `split-${ratio}`, `split-align-${align}`, colour && `split-colour-${colour}`)}"><div>${first}</div><div>${second}</div></div>`;

export const rail = (items: string[]): string => `<div class="rail">${items.join('')}</div>`;

export const center = (content: string): string => `<div class="center">${content}</div>`;

export const cluster = (items: string[]): string => `<div class="cluster">${items.join('')}</div>`;
