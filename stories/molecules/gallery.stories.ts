import type { Meta, StoryObj } from '@storybook/html-vite';
import { photos } from '../templates/content';
import { gallery, type GalleryProps } from './gallery.markup';

const meta: Meta<GalleryProps> = {
    title: 'Molecules/Gallery',
    render: (args) => gallery(args),
    args: {
        images: [photos.zedernweg, photos.nachi, photos.onsen, photos.torii, photos.steinbruecke, photos.krabbe],
        caption: 'Eindrücke vom Tag der offenen Tür 2026.',
    },
};
export default meta;

export const Gallery: StoryObj<GalleryProps> = {};
