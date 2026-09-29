import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconButton, type IconButtonProps } from './icon-button.markup';
import './icon-button.css';

const meta: Meta<IconButtonProps> = {
    tags: ['autodocs'],
    title: 'Atoms/Icon Button',
    render: (args) => iconButton(args),
    argTypes: { direction: { control: 'inline-radio', options: ['previous', 'next'] } },
    args: { direction: 'next' },
};
export default meta;

export const Previous: StoryObj<IconButtonProps> = { args: { direction: 'previous' } };
export const Next: StoryObj<IconButtonProps> = { args: { direction: 'next' } };
