import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { featureCard, type PlaceCardProps } from './feature-card.markup';
import { choice } from '../templates/controls';

const card = (p: PlaceCardProps) => `<div style="max-width:765px">${featureCard(p)}</div>`;

const meta: Meta<PlaceCardProps> = {
  title: 'Molecules/Feature Card',
  argTypes: {
    variant: choice<NonNullable<PlaceCardProps['variant']>>()('featured', 'default'),
    rule: { control: 'boolean' },
    tall: { control: 'boolean' },
  },
};
export default meta;

export const Featured: StoryObj<PlaceCardProps> = { render: localized(card, (c) => c.kumano.places[0]) };
export const Default: StoryObj<PlaceCardProps> = { args: { variant: 'default' }, render: localized(card, (c) => c.kumano.places[1]) };
// The card below the pair: rule and tall image.
export const Ruled: StoryObj<PlaceCardProps> = { render: localized(card, (c) => c.kumano.places[2]) };
