import type { Meta, StoryObj } from '@storybook/html-vite';
import { guide, kumano } from '../templates/content';
import { siteHeader, type SiteHeaderProps } from './site-header.markup';

const meta: Meta<SiteHeaderProps> = {
    title: 'Organisms/Site Header',
    tags: ['autodocs'],
    render: (args) => siteHeader(args),
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const Kumano: StoryObj<SiteHeaderProps> = { args: { nav: kumano.nav, languages: kumano.languages } };
export const Standard: StoryObj<SiteHeaderProps> = { args: { nav: guide.nav, themes: false } };
