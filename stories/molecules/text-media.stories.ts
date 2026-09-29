import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { textMedia, type TextMediaProps } from './text-media.markup';

const meta: Meta<TextMediaProps> = {
    title: 'Molecules/Text & Media',
    render: localized(textMedia, (c) => ({
        image: c.photos.onsen,
        title: c.kumano.places[1].title,
        text: c.kumano.places[1].description,
        link: { label: c.ui.readMore, href: '#' },
    })),
};
export default meta;

export const ImageLeft: StoryObj<TextMediaProps> = { args: { imageSide: 'left' } };
export const ImageRight: StoryObj<TextMediaProps> = { args: { imageSide: 'right' } };
