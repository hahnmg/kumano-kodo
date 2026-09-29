import type { Meta, StoryObj } from '@storybook/html-vite';
import { table, type TableProps } from './table.markup';

const meta: Meta<TableProps> = {
    title: 'Molecules/Table',
    render: (args) => `<div style="max-width:765px">${table(args)}</div>`,
    args: {
        caption: 'Schutzgebühren nach Tierart',
        head: ['Tierart', 'Schutzgebühr', 'Inklusive'],
        rows: [
            ['Hund', '280 €', 'Chip, Impfung, Kastration'],
            ['Katze', '120 €', 'Chip, Impfung, Kastration'],
            ['Kaninchen', '35 €', 'Impfung'],
        ],
    },
};
export default meta;

export const Table: StoryObj<TableProps> = {};
