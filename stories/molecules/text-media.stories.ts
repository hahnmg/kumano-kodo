import type { Meta, StoryObj } from '@storybook/html-vite';
import { photos } from '../templates/content';
import { textMedia, type TextMediaProps } from './text-media.markup';

const meta: Meta<TextMediaProps> = {
    title: 'Molecules/Text & Media',
    tags: ['autodocs'],
    render: (args) => textMedia(args),
    args: {
        image: photos.onsen,
        title: 'Yunomine Onsen',
        text: "Japan's oldest hot spring, in use since the twelfth century. After day three, the real reason to keep going.",
        link: { label: 'Read more', href: '#' },
    },
};
export default meta;

export const ImageLeft: StoryObj<TextMediaProps> = { args: { imageSide: 'left' } };
export const ImageRight: StoryObj<TextMediaProps> = { args: { imageSide: 'right' } };
