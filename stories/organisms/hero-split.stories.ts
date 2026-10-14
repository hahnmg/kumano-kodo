import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { heroSplit, type HeroSplitProps } from './hero-split.markup';

const meta: Meta<HeroSplitProps> = {
  title: 'Organisms/Hero Split',
  render: localized(heroSplit, ({ pages: { start: s }, guide }) => ({
    title: s.title,
    text: s.text,
    action: { label: s.action, href: '#' },
    panel: { title: s.panelTitle, items: guide.routes, more: { label: s.panelMore, href: '#' } },
  })),
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const HeroSplit: StoryObj<HeroSplitProps> = {};
