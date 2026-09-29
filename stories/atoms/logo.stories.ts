import type { Meta, StoryObj } from '@storybook/html-vite';
import { logo, type LogoProps } from './logo.markup';
import './logo.css';

const meta: Meta<LogoProps> = {
    title: 'Atoms/Logo',
    render: (args) => logo(args),
    args: { href: '/', label: 'Kumano Kodo' },
};
export default meta;

export const Playground: StoryObj<LogoProps> = {};
