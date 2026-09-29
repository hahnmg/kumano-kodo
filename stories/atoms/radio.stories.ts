import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { radio, type RadioProps } from './radio.markup';

const meta: Meta<RadioProps> = { title: 'Atoms/Radio', args: { name: 'route' } };
export default meta;

export const Checked: StoryObj<RadioProps> = {
    args: { checked: true, value: 'nakahechi' },
    render: localized(radio, (c) => ({ label: c.guide.routes[0].title })),
};
export const Unchecked: StoryObj<RadioProps> = {
    args: { checked: false, value: 'kohechi' },
    render: localized(radio, (c) => ({ label: c.guide.routes[2].title })),
};
