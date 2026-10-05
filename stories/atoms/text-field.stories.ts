import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { textField, type TextFieldProps } from './text-field.markup';

const meta: Meta<TextFieldProps> = {
    title: 'Atoms/Text Field',
    render: localized(
        (p: TextFieldProps) => `<div style="max-width:539px">${textField(p)}</div>`,
        (c) => ({ label: c.ui.emailAddress, placeholder: c.ui.emailPlaceholder }),
    ),
    args: { name: 'email', type: 'email' },
};
export default meta;

export const TextField: StoryObj<TextFieldProps> = {};

export const Invalid: StoryObj<TextFieldProps> = {
    render: localized(
        (p: TextFieldProps) => `<div style="max-width:539px">${textField(p)}</div>`,
        (c) => ({ label: `${c.ui.emailAddress} *`, value: 'name@', error: c.ui.emailInvalid, required: true }),
    ),
};
