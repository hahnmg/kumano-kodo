import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { gallery, type GalleryProps } from './gallery.markup';

const meta: Meta<GalleryProps> = {
    title: 'Molecules/Gallery',
    render: localized(gallery, ({ photos: p, samples }) => ({
        images: [p.zedernweg, p.nachi, p.onsen, p.torii, p.steinbruecke, p.krabbe],
        caption: samples.galleryCaption,
    })),
};
export default meta;

export const Gallery: StoryObj<GalleryProps> = {};
