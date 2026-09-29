import type { Meta, StoryObj } from '@storybook/html-vite';
import { photos } from '../templates/content';
import { figure, type FigureProps } from './figure.markup';

const meta: Meta<FigureProps> = {
    title: 'Molecules/Figure',
    tags: ['autodocs'],
    render: (args) => `<div style="max-width:765px">${figure(args)}</div>`,
};
export default meta;

export const Single: StoryObj<FigureProps> = {
    args: {
        images: [photos.steinbruecke],
        caption: 'Between Takahara and Chikatsuyu a dozen dry-stone bridges cross the slope. Kilometre 14.',
    },
};
export const Pair: StoryObj<FigureProps> = {
    args: {
        images: [photos.krabbe, photos.nebelbaum],
        caption: 'Notes from the roadside. A land crab after the rain, a cedar in the mist.',
    },
};
