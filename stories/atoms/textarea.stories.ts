import type { Meta, StoryObj } from '@storybook/html-vite';
import { textarea, type TextareaProps } from './textarea.markup';
import './text-field.css';
import './textarea.css';

const meta: Meta<TextareaProps> = {
    title: 'Atoms/Textarea',
    render: (args) => `<div style="max-width:539px">${textarea(args)}</div>`,
    args: { label: 'Nachricht', name: 'message', placeholder: 'Ihre Nachricht' },
};
export default meta;

export const Textarea: StoryObj<TextareaProps> = {};
