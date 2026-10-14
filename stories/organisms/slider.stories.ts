import type { Meta, StoryObj } from '@storybook/html-vite';
import { portraitCard } from '../molecules/portrait-card.markup';
import { localized } from '../templates/content';
import { slider, type SliderProps } from './slider.markup';

const meta: Meta<SliderProps> = {
  title: 'Organisms/Slider',
  render: localized(
    (p: SliderProps) => `<section class="section section-sunk section-bleed"><div class="section-inner">${slider(p)}</div></section>`,
    ({ home, kumano, ui }) => ({
      heading: home.stages,
      items: kumano.stages.map(portraitCard),
      labels: { previous: ui.previous, next: ui.next, item: ui.card },
    }),
  ),
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Slider: StoryObj<SliderProps> = {};
