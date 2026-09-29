import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconNames } from './icon.markup';
import { iconCircle, type IconCircleProps } from './icon-circle.markup';
import './icon.css';
import './icon-circle.css';

const meta: Meta<IconCircleProps> = {
    title: 'Atoms/Icon Circle',
    render: (args) => iconCircle(args),
    argTypes: { name: { control: 'select', options: iconNames } },
    args: { name: 'clock' },
};
export default meta;

export const Playground: StoryObj<IconCircleProps> = {};
