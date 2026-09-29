import type { Meta, StoryObj } from '@storybook/html-vite';
import { downloadList, type DownloadListProps } from './download-list.markup';

const meta: Meta<DownloadListProps> = {
    title: 'Molecules/Download List',
    render: (args) => `<div style="max-width:765px">${downloadList(args)}</div>`,
    args: {
        items: [
            { title: 'Stage map Chikatsuyu → Hongu', meta: 'PDF · 1,2 MB', href: '#' },
            { title: 'Bus timetable Hosshinmon – Hongu', meta: 'PDF · 96 KB', href: '#' },
            { title: 'Packing list for rain', meta: 'PDF · 240 KB', href: '#' },
        ],
    },
};
export default meta;

export const DownloadList: StoryObj<DownloadListProps> = {};
