import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { link, type LinkProps } from './link.markup';
import { choice } from '../templates/controls';

const meta: Meta<LinkProps> = {
  title: 'Atoms/Link',
  argTypes: { direction: choice<NonNullable<LinkProps['direction']>>()('forward', 'back') },
  args: { href: '#' },
};
export default meta;

export const Forward: StoryObj<LinkProps> = { args: { direction: 'forward' }, render: localized(link, (c) => ({ label: c.ui.readMore })) };
export const Back: StoryObj<LinkProps> = { args: { direction: 'back' }, render: localized(link, (c) => ({ label: c.pages.detail.back })) };
