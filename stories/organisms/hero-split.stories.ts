import type { Meta, StoryObj } from '@storybook/html-vite';
import { guide } from '../templates/content';
import { heroSplit, type HeroSplitProps } from './hero-split.markup';

const meta: Meta<HeroSplitProps> = {
    title: 'Organisms/Hero Split',
    render: (args) => heroSplit(args),
    parameters: { layout: 'fullscreen' },
    args: {
        title: 'Four days on the Nakahechi',
        text: 'A private trail journal from May 2026: the stages, the places worth a detour and what I wish I had known before setting out.',
        action: { label: 'See the stages', href: '#' },
        panel: { title: 'Ways to walk it', items: guide.routes, more: { label: 'Compare the routes', href: '#' } },
    },
};
export default meta;

export const HeroSplit: StoryObj<HeroSplitProps> = {};
