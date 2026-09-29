import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { checkbox, type CheckboxProps } from './checkbox.markup';

const meta: Meta<CheckboxProps> = {
    title: 'Atoms/Checkbox',
    render: localized(checkbox, (c) => ({ label: c.ui.consent })),
    args: { name: 'consent', checked: false },
};
export default meta;

export const Checkbox: StoryObj<CheckboxProps> = {};
