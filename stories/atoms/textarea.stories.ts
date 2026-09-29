import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { textarea, type TextareaProps } from './textarea.markup';

const meta: Meta<TextareaProps> = {
    title: 'Atoms/Textarea',
    render: localized(
        (p: TextareaProps) => `<div style="max-width:539px">${textarea(p)}</div>`,
        (c) => c.samples.textarea,
    ),
    args: { name: 'message' },
};
export default meta;

export const Textarea: StoryObj<TextareaProps> = {};
