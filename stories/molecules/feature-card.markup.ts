import { cx, esc, img, type Image } from '../../src/lib/html';

export type PlaceCardVariant = 'featured' | 'default';

export interface PlaceCardProps {
  image: Image;
  title: string;
  description: string;
  variant?: PlaceCardVariant;
  // A hairline above the card, and a taller photo: the card below a pair.
  rule?: boolean;
  tall?: boolean;
}

export const featureCard = ({ image, title, description, variant = 'default', rule = false, tall = false }: PlaceCardProps): string =>
  `<article class="${cx('feature-card', `feature-card-${variant}`, rule && 'feature-card-ruled', tall && 'feature-card-tall')}">${img(image, 'feature-card-image')}` +
  `<h3 class="feature-card-title ${variant === 'featured' ? 'type-h3' : 'type-h4'}">${esc(title)}</h3>` +
  `<p class="feature-card-text type-small">${esc(description)}</p></article>`;
