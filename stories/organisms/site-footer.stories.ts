import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { siteFooter, type SiteFooterProps } from './site-footer.markup';

const meta: Meta<SiteFooterProps> = { title: 'Organisms/Site Footer', parameters: { layout: 'fullscreen' } };
export default meta;

export const Kumano: StoryObj<SiteFooterProps> = { render: localized(siteFooter, (c) => c.kumano.footer) };
export const WithNotice: StoryObj<SiteFooterProps> = { render: localized(siteFooter, (c) => c.guide.footer) };
