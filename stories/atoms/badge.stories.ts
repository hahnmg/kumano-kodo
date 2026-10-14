import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { badge, type BadgeProps } from './badge.markup';

const meta: Meta<BadgeProps> = {
  title: 'Atoms/Badge',
  render: localized(badge, (c) => {
    const entry = c.guide.entries[2];
    return { label: 'badge' in entry && entry.badge ? entry.badge : '' };
  }),
};
export default meta;

export const Badge: StoryObj<BadgeProps> = {};
