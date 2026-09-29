import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized, type Content } from '../templates/content';
import { pageHeader, type PageHeaderProps } from './page-header.markup';

const trail = ({ pages }: Content, current: string) => [...pages.detail.crumbs.map((label) => ({ label, href: '#' })), { label: current }];

const meta: Meta<PageHeaderProps> = { title: 'Organisms/Page Header', parameters: { layout: 'fullscreen' } };
export default meta;

export const WithChips: StoryObj<PageHeaderProps> = {
    render: localized(pageHeader, (c) => ({
        title: c.pages.list.title,
        breadcrumb: [...c.pages.list.crumbs.map((label) => ({ label, href: '#' })), { label: c.pages.list.title }],
        chips: c.pages.list.chips.map((label, i) => ({ label, href: '#', active: i === 0 })),
        chipsLabel: c.ui.categories,
        breadcrumbLabel: c.ui.breadcrumb,
    })),
};
export const TitleOnly: StoryObj<PageHeaderProps> = {
    render: localized(pageHeader, (c) => ({
        title: c.kumano.stages[2].title,
        breadcrumb: trail(c, c.kumano.stages[2].title),
        breadcrumbLabel: c.ui.breadcrumb,
    })),
};
