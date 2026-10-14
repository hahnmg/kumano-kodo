import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { subNav, type SubNavProps } from './sub-nav.markup';

const meta: Meta<SubNavProps> = {
  title: 'Molecules/Sub Nav',
  render: localized(
    (p: SubNavProps) => `<div style="max-width:290px">${subNav(p)}</div>`,
    (c) => ({
      title: c.pages.detail.subNavTitle,
      items: c.kumano.stages.map((s, i) => ({ label: `${s.stage} · ${s.title}`, href: '#', active: i === 2 })),
    }),
  ),
};
export default meta;

export const SubNav: StoryObj<SubNavProps> = {};
