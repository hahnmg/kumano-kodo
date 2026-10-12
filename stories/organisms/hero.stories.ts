import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { hero, type HeroProps } from './hero.markup';

const meta: Meta<HeroProps> = {
    title: 'Organisms/Hero',
    render: localized(hero, (c) => c.kumano.hero),
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const Hero: StoryObj<HeroProps> = {};

// Poster, title and a play button; the video loads only when asked for.
export const WithVideo: StoryObj<HeroProps> = {
    render: localized(hero, (c) => ({
        ...c.kumano.hero,
        video: { src: '/img/video/trail.mp4', type: 'video/mp4', play: c.ui.playVideo, close: c.ui.closeVideo },
    })),
};
