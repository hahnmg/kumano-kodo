import type { Meta, StoryObj } from '@storybook/html-vite';
import { radio, type RadioProps } from './radio.markup';
import './checkbox.css';

const meta: Meta<RadioProps> = {
    tags: ['autodocs'],
    title: 'Atoms/Radio',
    render: (args) => radio(args),
    args: { label: 'Nakahechi', name: 'route', value: 'nakahechi', checked: true },
};
export default meta;

export const Checked: StoryObj<RadioProps> = { args: { checked: true } };
export const Unchecked: StoryObj<RadioProps> = { args: { checked: false, label: 'Kohechi', value: 'kohechi' } };
