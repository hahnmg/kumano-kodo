import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { gallery, type GalleryProps } from './gallery.markup';

// The lightbox has no markup of its own: src/scripts/lightbox.ts builds the dialog when an image is opened.
const meta: Meta<GalleryProps> = {
  title: 'Molecules/Lightbox',
  parameters: { usage: '\\blightbox-link\\b' },
  render: localized(gallery, ({ photos: p, samples, ui }) => ({
    images: [p['seaside-station'], p['nachi-pagoda'], p['harbour-ferry']],
    caption: samples.galleryCaption,
    labels: { close: ui.close, previous: ui.previous, next: ui.next, play: ui.playVideo },
  })),
};
export default meta;

export const Lightbox: StoryObj<GalleryProps> = {};
