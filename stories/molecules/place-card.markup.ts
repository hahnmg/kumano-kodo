import { esc, img, type Image } from '../../src/lib/html';

export type PlaceCardVariant = 'featured' | 'default' | 'ruled';

export interface PlaceCardProps {
    image: Image;
    title: string;
    description: string;
    variant?: PlaceCardVariant;
}

export const placeCard = ({ image, title, description, variant = 'default' }: PlaceCardProps): string =>
    `<article class="place-card place-card--${variant}">${img(image, 'place-card__image')}` +
    `<h3 class="place-card__title ${variant === 'featured' ? 'type-h3' : 'type-h4'}">${esc(title)}</h3>` +
    `<p class="place-card__description type-small">${esc(description)}</p></article>`;
