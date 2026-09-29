import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { gallery, type GalleryProps } from './gallery.markup';

const meta: Meta<GalleryProps> = {
    title: 'Molecules/Gallery',
    render: localized(gallery, ({ photos: p, samples }) => ({
        images: [p['morning-bus'], p['cedar-canopy'], p['walker-in-mist'], p['oji-shrine'], p['yunomine-street'], p['outdoor-bath']],
        caption: samples.galleryCaption,
    })),
};
export default meta;

export const Gallery: StoryObj<GalleryProps> = {};
