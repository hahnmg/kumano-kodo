import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { asVideo } from '../content/videos';
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

// One tile is a video: it opens in the lightbox like the photos and plays there.
export const WithVideo: StoryObj<GalleryProps> = {
  render: localized(gallery, ({ photos: p, samples, ui }) => ({
    images: [p['morning-bus'], asVideo(p['sea-of-clouds']), p['walker-in-mist'], p['oji-shrine'], p['yunomine-street'], p['outdoor-bath']],
    caption: samples.galleryCaption,
    labels: { close: ui.close, previous: ui.previous, next: ui.next, play: ui.playVideo },
  })),
};
