import type { Meta, StoryObj } from '@storybook/html-vite';
import type { Image } from '../../src/lib/html';
import { content } from '../templates/content';
import { bleedImage } from './bleed-image.markup';

const meta: Meta<{ image: Image }> = { title: 'Molecules/Bleed Image', parameters: { layout: 'fullscreen' } };
export default meta;

export const BleedImage: StoryObj = {
    render: (_, { globals }) => {
        const { photos, ui } = content(globals.locale);
        return bleedImage(photos['sea-of-clouds'], undefined, { close: ui.close, previous: ui.previous, next: ui.next });
    },
};
