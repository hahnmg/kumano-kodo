import type { Meta, StoryObj } from '@storybook/html-vite';
import { select, type SelectProps } from './select.markup';
import './icon.css';
import './text-field.css';
import './select.css';

const meta: Meta<SelectProps> = {
    title: 'Atoms/Select',
    render: (args) => `<div style="max-width:320px">${select(args)}</div>`,
    args: { label: 'Day', name: 'day', options: ['All days', 'Day 1', 'Day 2', 'Day 3', 'Day 4'], value: 'All days' },
};
export default meta;

export const Select: StoryObj<SelectProps> = {};
