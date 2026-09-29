import type { Meta, StoryObj } from '@storybook/html-vite';
import { kumano } from '../templates/content';
import { hero, type HeroProps } from './hero.markup';

const meta: Meta<HeroProps> = {
    title: 'Organisms/Hero',
    render: (args) => hero(args),
    args: kumano.hero,
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const Hero: StoryObj<HeroProps> = {};
