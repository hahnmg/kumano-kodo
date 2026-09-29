import { esc } from '../../src/lib/html';
import { link } from '../atoms/link.markup';

export type CtaCardVariant = 'default' | 'featured';

export interface CtaCardProps {
    title: string;
    text: string;
    linkLabel: string;
    href: string;
    variant?: CtaCardVariant;
}

export const ctaCard = ({ title, text, linkLabel, href, variant = 'default' }: CtaCardProps): string =>
    `<article class="cta-card cta-card--${variant}">` +
    `<h3 class="cta-card__title type-h4">${esc(title)}</h3>` +
    `<p class="cta-card__text type-small">${esc(text)}</p>` +
    `<div class="cta-card__link">${link({ label: linkLabel, href })}</div></article>`;
