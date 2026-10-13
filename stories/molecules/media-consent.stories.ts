import type { Meta, StoryObj } from '@storybook/html-vite';
import { content } from '../templates/content';
import { mediaConsent } from './media-consent.markup';

// On the privacy page: the stored answer of the video question, shown and changed in one box.
const meta: Meta = {
    title: 'Molecules/Media Consent',
    render: (_, { globals }) => {
        const { ui } = content(globals.locale);
        return mediaConsent({ text: ui.mediaConsentText, toggle: ui.mediaConsentToggle });
    },
};
export default meta;

export const MediaConsent: StoryObj = {};
