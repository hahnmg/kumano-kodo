import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, localized } from '../templates/content';
import { timeline, type DayRowProps } from './timeline-item.markup';

const meta: Meta<DayRowProps> = {
  title: 'Molecules/Timeline Item',
  render: localized(
    (p: DayRowProps) => timeline([p]),
    (c) => c.kumano.days[0],
  ),
};
export default meta;

export const TimelineItem: StoryObj<DayRowProps> = {};
export const List: StoryObj<DayRowProps> = { render: (_, { globals }) => timeline(content(globals.locale).kumano.days) };
