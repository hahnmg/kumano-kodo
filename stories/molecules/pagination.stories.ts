import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { pagination, type PaginationProps } from './pagination.markup';

const meta: Meta<PaginationProps> = {
  title: 'Molecules/Pagination',
  render: localized(pagination, ({ ui }) => ({ label: ui.pages, previousLabel: ui.previousPage, nextLabel: ui.nextPage })),
  args: { current: 1, total: 5, href: (p: number) => `?page=${p}` },
  argTypes: { href: { control: false } },
};
export default meta;

export const Pagination: StoryObj<PaginationProps> = {};
