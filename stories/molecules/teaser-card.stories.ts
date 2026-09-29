import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { teaserCard, type TeaserCardProps } from './teaser-card.markup';

const card = (p: TeaserCardProps) => `<div style="max-width:314px">${teaserCard(p)}</div>`;

const meta: Meta<TeaserCardProps> = { title: 'Molecules/Teaser Card', args: { href: '#' } };
export default meta;

export const Default: StoryObj<TeaserCardProps> = { render: localized(card, (c) => c.guide.entries[0]) };
export const WithBadge: StoryObj<TeaserCardProps> = { render: localized(card, (c) => c.guide.entries[2]) };
