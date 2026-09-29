import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo } from '../templates/content';
import { teaserCard, type TeaserCardProps } from './teaser-card.markup';

const meta: Meta<TeaserCardProps> = {
    title: 'Molecules/Teaser Card',
    tags: ['autodocs'],
    render: (args) => `<div style="max-width:314px">${teaserCard(args)}</div>`,
};
export default meta;

export const Default: StoryObj<TeaserCardProps> = { args: { ...demo.animals[0], href: '#' } };
export const WithBadge: StoryObj<TeaserCardProps> = { args: { ...demo.animals[2], href: '#' } };
