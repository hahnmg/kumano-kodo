import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized, type Content } from '../templates/content';
import { siteHeader, type SiteHeaderProps } from './site-header.markup';

const labels = ({ ui }: Content) => ({ nav: ui.mainNav, languages: ui.language, scheme: ui.darkMode, menu: ui.menu });

const meta: Meta<SiteHeaderProps> = { title: 'Organisms/Site Header', parameters: { layout: 'fullscreen' } };
export default meta;

export const Kumano: StoryObj<SiteHeaderProps> = {
    render: localized(siteHeader, (c) => ({ nav: c.kumano.nav, languages: c.languages, labels: labels(c) })),
};
export const Standard: StoryObj<SiteHeaderProps> = {
    render: localized(siteHeader, (c) => ({ nav: c.guide.nav, languages: c.languages, labels: labels(c) })),
};

// Open states for review; in use the flyouts open on click (src/scripts/nav-flyout.ts).
const room = (html: string) => `<div style="min-height:620px">${html}</div>`;
export const MegaOpen: StoryObj<SiteHeaderProps> = {
    render: localized(
        (p: SiteHeaderProps) => room(siteHeader(p)),
        (c) => ({ nav: c.kumano.nav.map((n, i) => ({ ...n, open: i === 0 })), languages: c.languages, labels: labels(c) }),
    ),
};
export const DropdownOpen: StoryObj<SiteHeaderProps> = {
    render: localized(
        (p: SiteHeaderProps) => room(siteHeader(p)),
        (c) => ({ nav: c.kumano.nav.map((n, i) => ({ ...n, open: i === 1 })), languages: c.languages, labels: labels(c) }),
    ),
};
