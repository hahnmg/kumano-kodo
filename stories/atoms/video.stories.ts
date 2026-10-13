import type { Meta, StoryObj } from '@storybook/html-vite';
import { asVideo } from '../content/videos';
import { content } from '../templates/content';
import { videoPoster } from './video.markup';

const frame = (html: string) => `<div style="max-width:765px">${html}</div>`;

// A video in an image's place: the photo as poster in the video's format, the player loads only on the click.
const meta: Meta = {
    title: 'Atoms/Video',
    render: (_, { globals }) => {
        const { photos, ui } = content(globals.locale);
        return frame(videoPoster(asVideo(photos['sea-of-clouds']), ui.playVideo));
    },
};
export default meta;

export const Video: StoryObj = {};
