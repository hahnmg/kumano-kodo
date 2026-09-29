import type { Meta, StoryObj } from '@storybook/html-vite';
import { kumano } from '../templates/content';
import { placeCard, type PlaceCardProps } from './place-card.markup';

const meta: Meta<PlaceCardProps> = {
    title: 'Molecules/Place Card',
    tags: ['autodocs'],
    render: (args) => `<div style="max-width:765px">${placeCard(args)}</div>`,
    argTypes: { variant: { control: 'inline-radio', options: ['featured', 'default', 'ruled'] } },
};
export default meta;

export const Featured: StoryObj<PlaceCardProps> = { args: kumano.places[0] };
export const Default: StoryObj<PlaceCardProps> = { args: { ...kumano.places[1], variant: 'default' } };
export const Ruled: StoryObj<PlaceCardProps> = { args: kumano.places[2] };
