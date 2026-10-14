import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, localized } from '../templates/content';
import { heroSlidesOf } from '../templates/kumano-home.markup';
import { hero, heroSlides, type HeroProps } from './hero.markup';

const meta: Meta<HeroProps> = {
  title: 'Organisms/Hero',
  render: localized(hero, (c) => c.kumano.hero),
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Hero: StoryObj<HeroProps> = {};

// Several photos with their own text; it moves on every seven seconds until paused.
export const Slides: StoryObj = {
  render: (_, { globals }) => heroSlides(heroSlidesOf(content(globals.locale))),
};
