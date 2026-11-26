import { skipLink } from '../atoms/skip-link.markup';
import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, type Content } from './content';
import { kumanoJournal } from './kumano-journal.markup';
import { newsDetailPage, newsListPage } from './site-pages.markup';
import { section } from '../layout/layout.markup';
import { richText } from '../molecules/rich-text.markup';
import { pageHeader } from '../organisms/page-header.markup';
import { siteFooter } from '../organisms/site-footer.markup';
import { siteHeader } from '../organisms/site-header.markup';

const page =
  (render: (c: Content) => string): StoryObj['render'] =>
  (_, { globals }) =>
    render(content(globals.locale));

// The home page in each theme and the starter set in Mono.
const meta: Meta = { title: 'Templates', tags: ['!autodocs', 'dev'], parameters: { layout: 'fullscreen', options: { showPanel: false } } };
export default meta;

export const HomeCaramel: StoryObj = { name: 'Home · Caramel', render: page(kumanoJournal), parameters: { theme: 'caramel' } };
export const HomeForest: StoryObj = { name: 'Home · Forest', render: page(kumanoJournal), parameters: { theme: 'forest' } };
export const HomeOcean: StoryObj = { name: 'Home · Ocean', render: page(kumanoJournal), parameters: { theme: 'ocean' } };
export const HomeViolet: StoryObj = { name: 'Home · Violet', render: page(kumanoJournal), parameters: { theme: 'violet' } };
export const HomeMono: StoryObj = { name: 'Home · Mono', render: page(kumanoJournal), parameters: { theme: 'mono' } };

// The starter set: Mono, the website title as logo, no upright name and no wordmark in the footer.
const starter = ({ languages, ui }: Content) =>
  skipLink({ label: ui.skipToContent }) +
  siteHeader({
    nav: [
      { label: 'About us', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    languages,
    labels: { nav: ui.mainNav, languages: ui.language, scheme: ui.darkMode, menu: ui.menu },
    logo: { variant: 'title', label: 'Your site', href: '#' },
  }) +
  `<main id="main">${pageHeader({ title: 'Home', breadcrumb: [{ label: 'Home' }] })}` +
  section({ content: richText({ html: '<p>This is your home page. Replace this text with an introduction to your site.</p>' }) }) +
  `</main>` +
  siteFooter({
    about: 'A short line about this site.',
    columns: [
      {
        title: 'Pages',
        links: [
          { label: 'About us', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
    ],
    copyright: '© Your name',
    backToTop: ui.backToTop,
    legal: [
      { label: 'Imprint', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  });
export const StarterMono: StoryObj = { name: 'Starter · Mono', render: page(starter), parameters: { theme: 'mono' } };

// EXT:news in the theme's components, as the extras package draws it: the list with pages, and the detail page.
export const NewsList: StoryObj = { name: 'News · List', render: page((c) => newsListPage(1, c)) };
export const NewsListPage2: StoryObj = { name: 'News · List, page 2', render: page((c) => newsListPage(2, c)) };
export const NewsDetail: StoryObj = { name: 'News · Detail', render: page((c) => newsDetailPage('a-land-crab', c)) };
