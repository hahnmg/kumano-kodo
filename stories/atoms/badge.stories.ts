import type { Meta, StoryObj } from '@storybook/html-vite';
import { badge, type BadgeProps } from './badge.markup';
import './badge.css';

const meta: Meta<BadgeProps> = {
    title: 'Atoms/Badge',
    render: (args) => badge(args),
    args: { label: 'älteres Tier' },
};
export default meta;

export const Playground: StoryObj<BadgeProps> = {};
