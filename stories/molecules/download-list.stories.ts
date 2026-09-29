import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { downloadList, type DownloadListProps } from './download-list.markup';

const meta: Meta<DownloadListProps> = {
    title: 'Molecules/Download List',
    render: localized(
        (p: DownloadListProps) => `<div style="max-width:765px">${downloadList(p)}</div>`,
        (c) => ({ items: c.pages.detail.downloads }),
    ),
};
export default meta;

export const DownloadList: StoryObj<DownloadListProps> = {};
