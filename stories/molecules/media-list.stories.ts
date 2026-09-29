import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo } from '../templates/content';
import { mediaList, type MediaListProps } from './media-list.markup';

const meta: Meta<MediaListProps> = {
    title: 'Molecules/Media List',
    render: (args) => `<div style="max-width:431px">${mediaList(args)}</div>`,
    args: { title: 'Tiere nach Art', items: demo.categories, more: { label: 'Alle Tiere ansehen', href: '#' } },
};
export default meta;

export const MediaList: StoryObj<MediaListProps> = {};
