import type { Meta, StoryObj } from '@storybook/html-vite';
import { pageHeader, type PageHeaderProps } from './page-header.markup';

const trail = [{ label: 'Start', href: '#' }, { label: 'Tiervermittlung', href: '#' }, { label: 'Hunde' }];

const meta: Meta<PageHeaderProps> = {
    title: 'Organisms/Page Header',
    tags: ['autodocs'],
    render: (args) => pageHeader(args),
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const WithChips: StoryObj<PageHeaderProps> = {
    args: {
        title: 'Hunde',
        breadcrumb: trail,
        chips: ['Hunde', 'Katzen', 'Kleintiere', 'Ältere Tiere'].map((label, i) => ({ label, href: '#', active: i === 0 })),
    },
};
export const TitleOnly: StoryObj<PageHeaderProps> = { args: { title: 'Bulldoggen Mischling', breadcrumb: trail } };
