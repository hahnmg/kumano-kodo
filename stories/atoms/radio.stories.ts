import type { Meta, StoryObj } from '@storybook/html-vite';
import { radio, type RadioProps } from './radio.markup';
import './checkbox.css';

const meta: Meta<RadioProps> = {
    tags: ['autodocs'],
    title: 'Atoms/Radio',
    render: (args) => radio(args),
    args: { label: 'Hund', name: 'animal', value: 'dog', checked: true },
};
export default meta;

export const Checked: StoryObj<RadioProps> = { args: { checked: true } };
export const Unchecked: StoryObj<RadioProps> = { args: { checked: false, label: 'Katze', value: 'cat' } };
