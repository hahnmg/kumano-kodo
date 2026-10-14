import { attrs, esc } from '../../src/lib/html';

export type LinkDirection = 'forward' | 'back';

export interface LinkProps {
  label: string;
  href: string;
  direction?: LinkDirection;
}

export const link = ({ label, href, direction = 'forward' }: LinkProps): string => {
  // The arrow is decorative and moves on hover, so it sits in its own span outside the accessible name.
  const arrow = `<span class="link-arrow" aria-hidden="true">${direction === 'back' ? '←' : '→'}</span>`;
  const text = `<span class="link-label">${esc(label)}</span>`;
  return `<a${attrs({ class: `link link-${direction} type-button`, href })}>${direction === 'back' ? `${arrow} ${text}` : `${text} ${arrow}`}</a>`;
};
