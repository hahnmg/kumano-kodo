import type { Meta, StoryObj } from '@storybook/html-vite';
import { pagination, type PaginationProps } from './pagination.markup';

const meta: Meta<PaginationProps> = {
    title: 'Molecules/Pagination',
    render: (args) => pagination(args),
    args: { current: 1, total: 5, href: (p: number) => `?page=${p}` },
    argTypes: { href: { control: false } },
};
export default meta;

export const Pagination: StoryObj<PaginationProps> = {};
