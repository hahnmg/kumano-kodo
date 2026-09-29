import type { Meta, StoryObj } from '@storybook/html-vite';
import { guide } from '../templates/content';
import { mediaList, type MediaListProps } from './media-list.markup';

const meta: Meta<MediaListProps> = {
    title: 'Molecules/Media List',
    render: (args) => `<div style="max-width:431px">${mediaList(args)}</div>`,
    args: { title: 'Ways to walk it', items: guide.routes, more: { label: 'Compare the routes', href: '#' } },
};
export default meta;

export const MediaList: StoryObj<MediaListProps> = {};
