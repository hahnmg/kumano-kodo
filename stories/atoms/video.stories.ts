import type { Meta, StoryObj } from '@storybook/html-vite';
import { asExternalVideo, asVideo } from '../content/videos';
import { paths } from '../content/paths';
import { content } from '../templates/content';
import { videoPoster, type VideoConsentLabels } from './video.markup';

const frame = (html: string) => `<div style="max-width:765px">${html}</div>`;

const consentLabels = (ui: ReturnType<typeof content>['ui']): VideoConsentLabels => ({
    text: ui.videoConsent,
    remember: ui.videoConsentRemember,
    load: ui.videoConsentLoad,
    privacy: { label: ui.videoConsentPrivacy, href: paths.legal('privacy') },
});

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

// From YouTube or Vimeo: the click asks first, as loading the player sends the visitor's address to the provider.
export const External: StoryObj = {
    render: (_, { globals }) => {
        const { photos, ui } = content(globals.locale);
        return frame(videoPoster(asExternalVideo(photos['sea-of-clouds']), ui.playVideo, { consent: consentLabels(ui) }));
    },
};

// The question as it stands after the click, here at a phone's width.
export const ExternalAsked: StoryObj = {
    name: 'External, asked',
    render: (_, { globals }) => {
        const { photos, ui } = content(globals.locale);
        const html = videoPoster(asExternalVideo(photos['sea-of-clouds']), ui.playVideo, { consent: consentLabels(ui) })
            .replace('<div class="video"', '<div class="video" data-playing')
            .replace(/<template class="video-consent-source">([\s\S]*)<\/template>/, '$1');
        return `<div style="max-width:358px">${html}</div>`;
    },
};
