import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo } from '../templates/content';
import { heroSplit, type HeroSplitProps } from './hero-split.markup';

const meta: Meta<HeroSplitProps> = {
    title: 'Organisms/Hero Split',
    render: (args) => heroSplit(args),
    parameters: { layout: 'fullscreen' },
    args: {
        title: 'Ein Zuhause für Tiere, die eines suchen',
        text: 'Wir versorgen Hunde, Katzen und Kleintiere, bis sie ein neues Zuhause gefunden haben.',
        action: { label: 'Tiere kennenlernen', href: '#' },
        panel: { title: 'Tiere nach Art', items: demo.categories, more: { label: 'Alle Tiere ansehen', href: '#' } },
    },
};
export default meta;

export const HeroSplit: StoryObj<HeroSplitProps> = {};
