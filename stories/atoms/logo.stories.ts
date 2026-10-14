import type { Meta, StoryObj } from '@storybook/html-vite';
import { choice } from '../templates/controls';
import { logo, type LogoProps } from './logo.markup';
import './logo.css';

const meta: Meta<LogoProps> = {
  title: 'Atoms/Logo',
  render: (args) => logo(args),
  args: { href: '/', label: 'Kumano Kodo' },
  argTypes: { variant: choice<NonNullable<LogoProps['variant']>>()('mark', 'title') },
};
export default meta;

export const Logo: StoryObj<LogoProps> = {};
// A site without a logo of its own shows its name; the starter set starts like this.
export const SiteTitle: StoryObj<LogoProps> = { args: { variant: 'title', label: 'Your site' } };
