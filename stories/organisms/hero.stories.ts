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
