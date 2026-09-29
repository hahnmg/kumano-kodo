import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { select, type SelectProps } from './select.markup';

const meta: Meta<SelectProps> = {
    title: 'Atoms/Select',
    render: localized(
        (p: SelectProps) => `<div style="max-width:320px">${select(p)}</div>`,
        (c) => ({ ...c.pages.list.day, value: c.pages.list.day.options[0] }),
    ),
    args: { name: 'day' },
};
export default meta;

export const Select: StoryObj<SelectProps> = {};
