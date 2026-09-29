import type { Meta, StoryObj } from '@storybook/html-vite';
import type { Image } from '../../src/lib/html';
import { content } from '../templates/content';
import { bleedPhoto } from './bleed-photo.markup';

const meta: Meta<{ image: Image }> = { title: 'Molecules/Bleed Photo', parameters: { layout: 'fullscreen' } };
export default meta;

export const BleedPhoto: StoryObj = {
    render: (_, { globals }) => {
        const { photos, ui } = content(globals.locale);
        return bleedPhoto(photos['sea-of-clouds'], undefined, { close: ui.close, previous: ui.previous, next: ui.next });
    },
};
