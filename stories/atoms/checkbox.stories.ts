import type { Meta, StoryObj } from '@storybook/html-vite';
import { checkbox, type CheckboxProps } from './checkbox.markup';
import './checkbox.css';

const meta: Meta<CheckboxProps> = {
    title: 'Atoms/Checkbox',
    render: (args) => checkbox(args),
    args: { label: 'I would like to receive the newsletter and have read the privacy policy.', name: 'consent', checked: false },
};
export default meta;

export const Playground: StoryObj<CheckboxProps> = {};
