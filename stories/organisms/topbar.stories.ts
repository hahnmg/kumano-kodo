import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { topbar, type TopbarProps } from './topbar.markup';

const meta: Meta<TopbarProps> = {
  title: 'Organisms/Topbar',
  render: localized(topbar, (c) => ({ ...c.guide.topbar, ariaLabel: c.ui.trailStatus })),
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Topbar: StoryObj<TopbarProps> = {};
