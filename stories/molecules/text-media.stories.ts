import type { Meta, StoryObj } from '@storybook/html-vite';
import { photos } from '../templates/content';
import { textMedia, type TextMediaProps } from './text-media.markup';

const meta: Meta<TextMediaProps> = {
    title: 'Molecules/Text & Media',
    tags: ['autodocs'],
    render: (args) => textMedia(args),
    args: {
        image: photos.steinbruecke,
        title: 'Jugendgruppe',
        text: 'Jeden zweiten Samstag lernen Kinder ab zehn Jahren, wie man Tiere versorgt, liest und respektiert.',
        link: { label: 'Mehr erfahren', href: '#' },
    },
};
export default meta;

export const ImageLeft: StoryObj<TextMediaProps> = { args: { imageSide: 'left' } };
export const ImageRight: StoryObj<TextMediaProps> = { args: { imageSide: 'right' } };
