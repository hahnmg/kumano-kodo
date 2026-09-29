import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo, kumano } from '../templates/content';
import { siteFooter, type SiteFooterProps } from './site-footer.markup';

const meta: Meta<SiteFooterProps> = {
    title: 'Organisms/Site Footer',
    tags: ['autodocs'],
    render: (args) => siteFooter(args),
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const Kumano: StoryObj<SiteFooterProps> = { args: kumano.footer };
export const WithNotice: StoryObj<SiteFooterProps> = { args: demo.footer };
