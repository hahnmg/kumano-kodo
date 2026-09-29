import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { breadcrumb, type BreadcrumbProps } from './breadcrumb.markup';

const meta: Meta<BreadcrumbProps> = {
    title: 'Molecules/Breadcrumb',
    render: localized(breadcrumb, (c) => ({
        items: [...c.pages.detail.crumbs.map((label) => ({ label, href: '#' })), { label: c.kumano.stages[2].title }],
        label: c.ui.breadcrumb,
    })),
};
export default meta;

export const Breadcrumb: StoryObj<BreadcrumbProps> = {};
