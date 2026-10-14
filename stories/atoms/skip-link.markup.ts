import { attrs, esc } from '../../src/lib/html';

export interface SkipLinkProps {
  label?: string;
  target?: string;
}

// The first element of every page; it stays out of view until the keyboard reaches it.
export const skipLink = ({ label = 'Skip to content', target = 'main' }: SkipLinkProps = {}): string =>
  `<a${attrs({ class: 'skip-link type-button', href: `#${target}` })}>${esc(label)}</a>`;
