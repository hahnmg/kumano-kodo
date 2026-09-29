import type { Meta, StoryObj } from '@storybook/html-vite';
import { kumano } from '../templates/content';
import { dayList, type DayRowProps } from './day-row.markup';

const meta: Meta<DayRowProps> = {
    title: 'Molecules/Day Row',
    render: (args) => dayList([args]),
    args: kumano.days[0],
};
export default meta;

export const DayRow: StoryObj<DayRowProps> = {};
export const List: StoryObj<DayRowProps> = { render: () => dayList(kumano.days) };
