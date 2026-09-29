import type { Meta, StoryObj } from '@storybook/html-vite';
import { chip, type ChipProps } from './chip.markup';
import './chip.css';

const meta: Meta<ChipProps> = {
    title: 'Atoms/Chip',
    render: (args) => chip(args),
    args: { label: 'Katzen', href: '#', active: false },
};
export default meta;

export const Playground: StoryObj<ChipProps> = {};
export const Default: StoryObj<ChipProps> = { args: { active: false } };
export const Active: StoryObj<ChipProps> = { args: { active: true, label: 'Hunde' } };
