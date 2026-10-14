import { esc } from '../../src/lib/html';
import { sliderDots } from '../atoms/slider-dots.markup';
import { sectionHeading, type SectionHeadingProps } from '../molecules/section-heading.markup';

export interface SliderLabels {
  previous: string;
  next: string;
  item: string;
}

export interface SliderProps {
  heading: Omit<SectionHeadingProps, 'variant' | 'controlLabels'>;
  items: string[];
  labels?: Partial<SliderLabels>;
}

const defaultLabels: SliderLabels = { previous: 'Previous', next: 'Next', item: 'Card' };

// src/scripts/slider.ts wires arrows, dots and keys; without it the track still scrolls and snaps.
export const slider = ({ heading, items, labels = {} }: SliderProps): string => {
  const l = { ...defaultLabels, ...labels };
  return (
    `<div class="slider" data-slider>` +
    sectionHeading({ ...heading, variant: 'with-controls', controlLabels: l }) +
    `<div class="rail slider-track" tabindex="0" role="group" aria-label="${esc(heading.title)}">${items.join('')}</div>` +
    `<div class="slider-indicator">${sliderDots({ count: items.length, label: l.item })}</div>` +
    `</div>`
  );
};
