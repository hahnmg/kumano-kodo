import { esc, img, type Image } from '../../src/lib/html';

export type PlaceCardVariant = 'featured' | 'default' | 'ruled';

export interface PlaceCardProps {
    image: Image;
    title: string;
    description: string;
    variant?: PlaceCardVariant;
}

export const featureCard = ({ image, title, description, variant = 'default' }: PlaceCardProps): string =>
    `<article class="feature-card feature-card-${variant}">${img(image, 'feature-card-image')}` +
    `<h3 class="feature-card-title ${variant === 'featured' ? 'type-h3' : 'type-h4'}">${esc(title)}</h3>` +
    `<p class="feature-card-text type-small">${esc(description)}</p></article>`;
