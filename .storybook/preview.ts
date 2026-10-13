import type { Preview } from '@storybook/html-vite';
import { SELECT_STORY, UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import '../src/tokens/tokens.css';
import '../src/styles/base.css';
import { brandTheme } from './brand';
import { DocsPage } from './docs-page';
import './docs.css';
import { bindBackToTop } from '../src/scripts/back-to-top';
import { bindFileUploads } from '../src/scripts/file-upload';
import { bindLightbox } from '../src/scripts/lightbox';
import { bindMediaConsent, bindVideos, syncMediaConsent } from '../src/scripts/video';
import { bindMenuToggle } from '../src/scripts/menu-toggle';
import { bindNavFlyouts } from '../src/scripts/nav-flyout';
import { bindSchemeToggle, syncSchemeToggles } from '../src/scripts/scheme-toggle';
import { bindSliders, syncSliders } from '../src/scripts/slider';
import { bindStickyHeader, syncStickyHeaders } from '../src/scripts/sticky-header';
import { storyFor } from '../stories/content/paths';
import { isLocale, locales } from '../stories/templates/content';
import { formatSource } from './format-source';

// Every component stylesheet, so stories and templates render with all styles present.
import.meta.glob('../stories/**/*.css', { eager: true });

const updateGlobals = (globals: Record<string, string>) => addons.getChannel().emit(UPDATE_GLOBALS, { globals });

// The header controls drive the toolbar, so the toolbar and the page never disagree.
bindSchemeToggle(document, (scheme) => updateGlobals({ scheme }));
bindMenuToggle(document);
bindNavFlyouts(document);
bindSliders(document);
bindLightbox(document);
bindVideos(document);
bindMediaConsent(document);
bindStickyHeader(window);
bindBackToTop(window);
bindFileUploads(document);
document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[data-locale]') : null;
    const locale = link?.getAttribute('data-locale');
    if (!link || !isLocale(locale)) return;
    event.preventDefault();
    updateGlobals({ locale });
});

// Site links are real paths (/days/2); here they open the matching story, and a #hash scrolls once it has rendered.
// Storybook's <base target="_parent"> would send plain #anchors to the manager window, so those scroll here too.
let pendingHash = '';
document.addEventListener('click', (event) => {
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    const target =
        anchor && anchor.getAttribute('href') !== '#' ? document.getElementById((anchor.getAttribute('href') ?? '').slice(1)) : null;
    if (anchor && target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        return;
    }
    // Site paths only; links to stories themselves (/?path=…) keep their own handling.
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="/"]:not([href^="/?"])') : null;
    const href = link?.getAttribute('href') ?? '';
    const storyId = storyFor(href);
    if (!link || !storyId || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    pendingHash = href.includes('#') ? href.split('#')[1] : '';
    addons.getChannel().emit(SELECT_STORY, { storyId });
});

const preview: Preview = {
    // Components show one docs page each; only templates keep story entries in the sidebar.
    tags: ['autodocs', '!dev'],
    globalTypes: {
        locale: {
            description: 'Language',
            toolbar: { icon: 'globe', items: Object.entries(locales).map(([value, title]) => ({ value, title })), dynamicTitle: true },
        },
        scheme: {
            description: 'Colour scheme',
            toolbar: { icon: 'contrast', items: ['light', 'dark'], dynamicTitle: true },
        },
    },
    initialGlobals: { locale: 'en', scheme: 'light' },
    decorators: [
        (story, context) => {
            const html = document.documentElement;
            html.dataset.theme = (context.parameters.theme as string | undefined) ?? 'caramel';
            html.dataset.scheme = context.globals.scheme;
            html.lang = isLocale(context.globals.locale) ? context.globals.locale : 'en';
            const rendered = story();
            requestAnimationFrame(() => {
                if (pendingHash) document.getElementById(pendingHash)?.scrollIntoView();
                else if (context.viewMode === 'story') window.scrollTo(0, 0);
                pendingHash = '';
                syncSchemeToggles();
                syncSliders();
                syncStickyHeaders();
                syncMediaConsent();
            });
            return rendered;
        },
    ],
    parameters: {
        layout: 'padded',
        docs: { page: DocsPage, theme: brandTheme('light'), source: { language: 'html', transform: (code: string) => formatSource(code) } },
        options: {
            storySort: {
                order: [
                    'Introduction',
                    'Core theme issues',
                    'Fluid components',
                    'Site',
                    'Templates',
                    'Organisms',
                    'Molecules',
                    'Atoms',
                    'Layout',
                ],
            },
        },
    },
};

export default preview;
