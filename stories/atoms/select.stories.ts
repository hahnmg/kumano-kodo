import type { Meta, StoryObj } from '@storybook/html-vite';
import { select, type SelectProps } from './select.markup';
import './icon.css';
import './text-field.css';
import './select.css';

const meta: Meta<SelectProps> = {
    title: 'Atoms/Select',
    render: (args) => `<div style="max-width:320px">${select(args)}</div>`,
    args: { label: 'Geschlecht', name: 'sex', options: ['alle', 'männlich', 'weiblich'], value: 'alle' },
};
export default meta;

export const Select: StoryObj<SelectProps> = {};
