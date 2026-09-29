import type { Meta, StoryObj } from '@storybook/html-vite';
import { textField, type TextFieldProps } from './text-field.markup';
import './text-field.css';

const meta: Meta<TextFieldProps> = {
    title: 'Atoms/Text Field',
    render: (args) => `<div style="max-width:539px">${textField(args)}</div>`,
    args: { label: 'Email address', name: 'email', type: 'email', placeholder: 'name@example.com' },
};
export default meta;

export const Playground: StoryObj<TextFieldProps> = {};
