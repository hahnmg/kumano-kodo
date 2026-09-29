import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, localized } from '../templates/content';
import { dayList, type DayRowProps } from './day-row.markup';

const meta: Meta<DayRowProps> = {
    title: 'Molecules/Day Row',
    render: localized(
        (p: DayRowProps) => dayList([p]),
        (c) => c.kumano.days[0],
    ),
};
export default meta;

export const DayRow: StoryObj<DayRowProps> = {};
export const List: StoryObj<DayRowProps> = { render: (_, { globals }) => dayList(content(globals.locale).kumano.days) };
