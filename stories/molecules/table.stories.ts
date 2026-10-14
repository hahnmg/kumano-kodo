import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { table, type TableProps } from './table.markup';

const meta: Meta<TableProps> = {
  title: 'Molecules/Table',
  render: localized(
    (p: TableProps) => `<div style="max-width:765px">${table(p)}</div>`,
    (c) => c.samples.table,
  ),
};
export default meta;

export const Table: StoryObj<TableProps> = {};
