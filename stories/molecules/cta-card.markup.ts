import { esc } from '../../src/lib/html';
import { link } from '../atoms/link.markup';

export type CtaCardVariant = 'default' | 'featured';

export interface CtaCardProps {
  title: string;
  text: string;
  linkLabel: string;
  href: string;
  variant?: CtaCardVariant;
  // A bar in the accent beside the card instead of the rule above it.
  edge?: boolean;
}

export const ctaCard = ({ title, text, linkLabel, href, variant = 'default', edge = false }: CtaCardProps): string =>
  `<article class="cta-card cta-card-${variant}${edge ? ' cta-card-edge' : ''}">` +
  `<h3 class="cta-card-title type-h4">${esc(title)}</h3>` +
  `<p class="cta-card-text type-small">${esc(text)}</p>` +
  `<div class="cta-card-link">${link({ label: linkLabel, href })}</div></article>`;
