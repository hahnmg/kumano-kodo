import type { Meta, StoryObj } from '@storybook/html-vite';
import { link, type LinkProps } from './link.markup';
import './link.css';

const meta: Meta<LinkProps> = {
    title: 'Atoms/Link',
    render: (args) => link(args),
    argTypes: { direction: { control: 'inline-radio', options: ['forward', 'back'] } },
    args: { label: 'Mehr erfahren', href: '#', direction: 'forward' },
};
export default meta;

export const Playground: StoryObj<LinkProps> = {};
export const Forward: StoryObj<LinkProps> = { args: { direction: 'forward', label: 'Mehr erfahren' } };
export const Back: StoryObj<LinkProps> = { args: { direction: 'back', label: 'Zurück zur Übersicht' } };
