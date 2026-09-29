import type { Meta, StoryObj } from '@storybook/html-vite';
import { downloadList, type DownloadListProps } from './download-list.markup';

const meta: Meta<DownloadListProps> = {
    title: 'Molecules/Download List',
    render: (args) => `<div style="max-width:765px">${downloadList(args)}</div>`,
    args: {
        items: [
            { title: 'Tierabgabevertrag', meta: 'PDF · 240 KB', href: '#' },
            { title: 'Vermittlungsgebühren 2026', meta: 'PDF · 96 KB', href: '#' },
            { title: 'Merkblatt Katzenhaltung', meta: 'PDF · 1,2 MB', href: '#' },
        ],
    },
};
export default meta;

export const DownloadList: StoryObj<DownloadListProps> = {};
