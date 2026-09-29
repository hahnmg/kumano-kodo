import type { Meta, StoryObj } from '@storybook/html-vite';
import { table, type TableProps } from './table.markup';

const meta: Meta<TableProps> = {
    title: 'Molecules/Table',
    render: (args) => `<div style="max-width:765px">${table(args)}</div>`,
    args: {
        caption: 'Stages at a glance',
        head: ['Stage', 'Distance', 'Ascent', 'Walking time'],
        rows: [
            ['Takijiri → Takahara', '4,0 km', '+400 m', '2:10 h'],
            ['Takahara → Chikatsuyu', '9,8 km', '+620 m', '4:40 h'],
            ['Chikatsuyu → Hongu', '25,9 km', '+1 180 m', '9:20 h'],
            ['Koguchi → Nachi', '14,5 km', '+940 m', '7:00 h'],
        ],
    },
};
export default meta;

export const Table: StoryObj<TableProps> = {};
