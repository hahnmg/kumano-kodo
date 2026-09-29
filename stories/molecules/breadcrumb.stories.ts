import type { Meta, StoryObj } from '@storybook/html-vite';
import { breadcrumb, type BreadcrumbProps } from './breadcrumb.markup';

const meta: Meta<BreadcrumbProps> = {
    title: 'Molecules/Breadcrumb',
    render: (args) => breadcrumb(args),
    args: { items: [{ label: 'Start', href: '#' }, { label: 'Tiervermittlung', href: '#' }, { label: 'Hunde' }] },
};
export default meta;

export const Breadcrumb: StoryObj<BreadcrumbProps> = {};
