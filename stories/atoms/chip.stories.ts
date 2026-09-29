import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { chip, type ChipProps } from './chip.markup';

const meta: Meta<ChipProps> = { title: 'Atoms/Chip', args: { href: '#' } };
export default meta;

export const Default: StoryObj<ChipProps> = { args: { active: false }, render: localized(chip, (c) => ({ label: c.pages.list.chips[2] })) };
export const Active: StoryObj<ChipProps> = { args: { active: true }, render: localized(chip, (c) => ({ label: c.pages.list.chips[1] })) };
