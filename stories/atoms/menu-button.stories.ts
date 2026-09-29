import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { menuButton, type MenuButtonProps } from './menu-button.markup';

const meta: Meta<MenuButtonProps> = { title: 'Atoms/Menu Button', render: localized(menuButton, (c) => ({ label: c.ui.menu })) };
export default meta;

export const Closed: StoryObj<MenuButtonProps> = { args: { expanded: false } };
export const Open: StoryObj<MenuButtonProps> = { args: { expanded: true } };
