import type { Meta, StoryObj } from '@storybook/html-vite';
import { link, type LinkProps } from './link.markup';
import './link.css';

const meta: Meta<LinkProps> = {
    tags: ['autodocs'],
    title: 'Atoms/Link',
    render: (args) => link(args),
    argTypes: { direction: { control: 'inline-radio', options: ['forward', 'back'] } },
    args: { label: 'Read more', href: '#', direction: 'forward' },
};
export default meta;

export const Forward: StoryObj<LinkProps> = { args: { direction: 'forward', label: 'Read more' } };
export const Back: StoryObj<LinkProps> = { args: { direction: 'back', label: 'All stages' } };
