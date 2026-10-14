import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { sliderDots, type SliderDotsProps } from './slider-dots.markup';

const meta: Meta<SliderDotsProps> = {
  title: 'Atoms/Slider Dots',
  render: localized(sliderDots, (c) => ({ label: c.ui.card })),
  args: { count: 5, active: 0 },
};
export default meta;

export const SliderDots: StoryObj<SliderDotsProps> = {};
