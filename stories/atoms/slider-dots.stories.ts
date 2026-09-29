import type { Meta, StoryObj } from '@storybook/html-vite';
import { sliderDots, type SliderDotsProps } from './slider-dots.markup';
import './slider-dots.css';

const meta: Meta<SliderDotsProps> = {
    title: 'Atoms/Slider Dots',
    render: (args) => sliderDots(args),
    args: { count: 5, active: 0 },
};
export default meta;

export const Playground: StoryObj<SliderDotsProps> = {};
