import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { mediaList, type MediaListProps } from './media-list.markup';

const meta: Meta<MediaListProps> = {
  title: 'Molecules/Media List',
  render: localized(
    (p: MediaListProps) => `<div style="max-width:431px">${mediaList(p)}</div>`,
    (c) => ({ title: c.pages.start.panelTitle, items: c.guide.routes, more: { label: c.pages.start.panelMore, href: '#' } }),
  ),
};
export default meta;

export const MediaList: StoryObj<MediaListProps> = {};
