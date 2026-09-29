import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo } from '../templates/content';
import { topbar, type TopbarProps } from './topbar.markup';

const meta: Meta<TopbarProps> = {
    title: 'Organisms/Topbar',
    render: (args) => topbar(args),
    args: demo.topbar,
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const Topbar: StoryObj<TopbarProps> = {};
