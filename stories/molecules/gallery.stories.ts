import type { Meta, StoryObj } from '@storybook/html-vite';
import { photos } from '../templates/content';
import { gallery, type GalleryProps } from './gallery.markup';

const meta: Meta<GalleryProps> = {
    title: 'Molecules/Gallery',
    render: (args) => gallery(args),
    args: {
        images: [photos.zedernweg, photos.nachi, photos.onsen, photos.torii, photos.steinbruecke, photos.krabbe],
        caption: 'Notes from four days on the Nakahechi, May 2026.',
    },
};
export default meta;

export const Gallery: StoryObj<GalleryProps> = {};
