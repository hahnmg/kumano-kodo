import type { Meta, StoryObj } from '@storybook/html-vite';
import { icon, iconNames, type IconProps } from './icon.markup';
import './icon.css';

const meta: Meta<IconProps> = {
  tags: ['autodocs'],
  title: 'Atoms/Icon',
  render: (args) => icon(args),
  argTypes: { name: { control: 'select', options: iconNames }, size: { control: { type: 'number', min: 12, max: 48 } } },
  args: { name: 'clock', size: 24 },
};
export default meta;

export const Default: StoryObj<IconProps> = {};

export const All: StoryObj<IconProps> = {
  render: () => `<div style="display:flex;gap:24px">${iconNames.map((name) => icon({ name })).join('')}</div>`,
};
