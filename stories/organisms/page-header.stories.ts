import type { Meta, StoryObj } from '@storybook/html-vite';
import { pageHeader, type PageHeaderProps } from './page-header.markup';

const trail = [{ label: 'Start', href: '#' }, { label: 'The route', href: '#' }, { label: 'Stages and places' }];

const meta: Meta<PageHeaderProps> = {
    title: 'Organisms/Page Header',
    tags: ['autodocs'],
    render: (args) => pageHeader(args),
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const WithChips: StoryObj<PageHeaderProps> = {
    args: {
        title: 'Stages and places',
        breadcrumb: trail,
        chips: ['All', 'Stages', 'Places', 'Day trips'].map((label, i) => ({ label, href: '#', active: i === 0 })),
    },
};
export const TitleOnly: StoryObj<PageHeaderProps> = { args: { title: 'Chikatsuyu → Hongu', breadcrumb: trail } };
