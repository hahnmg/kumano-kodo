import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { placeCard, type PlaceCardProps } from './place-card.markup';

const card = (p: PlaceCardProps) => `<div style="max-width:765px">${placeCard(p)}</div>`;

const meta: Meta<PlaceCardProps> = {
    title: 'Molecules/Place Card',
    argTypes: { variant: { control: 'inline-radio', options: ['featured', 'default', 'ruled'] } },
};
export default meta;

export const Featured: StoryObj<PlaceCardProps> = { render: localized(card, (c) => c.kumano.places[0]) };
export const Default: StoryObj<PlaceCardProps> = { args: { variant: 'default' }, render: localized(card, (c) => c.kumano.places[1]) };
export const Ruled: StoryObj<PlaceCardProps> = { render: localized(card, (c) => c.kumano.places[2]) };
