import type { Meta, StoryObj } from '@storybook/html-vite';
import { content } from '../templates/content';
import { navFlyout } from './nav-flyout.markup';

const menu = (locale: unknown, i: number) => content(locale).kumano.nav[i].menu;

const meta: Meta = { title: 'Molecules/Nav Flyout', parameters: { layout: 'fullscreen' } };
export default meta;

export const Dropdown: StoryObj = {
  render: (_, { globals }) => {
    const m = menu(globals.locale, 1);
    return m ? `<div style="padding:24px">${navFlyout(m)}</div>` : '';
  },
};
export const Mega: StoryObj = {
  render: (_, { globals }) => {
    const m = menu(globals.locale, 0);
    return m ? navFlyout(m) : '';
  },
};
