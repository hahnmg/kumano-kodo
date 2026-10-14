import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { linkGroups, type LinkGroupsProps } from './link-groups.markup';

const meta: Meta<LinkGroupsProps> = {
  title: 'Molecules/Link Groups',
  render: localized(linkGroups, (c) => ({
    groups: c.guide.footer.columns.map(({ title, links }) => ({
      title,
      links: links.flatMap(({ label, href }) => (href ? [{ label, href }] : [])),
    })),
  })),
};
export default meta;

export const LinkGroups: StoryObj<LinkGroupsProps> = {};
