import type { Preview } from '@storybook/html-vite';
import { UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import '../src/tokens/tokens.css';
import '../src/styles/base.css';
import './docs.css';
import { bindLightbox } from '../src/scripts/lightbox';
import { bindMenuToggle } from '../src/scripts/menu-toggle';
import { bindNavFlyouts } from '../src/scripts/nav-flyout';
import { bindSchemeToggle, syncSchemeToggles } from '../src/scripts/scheme-toggle';
import { bindSliders, syncSliders } from '../src/scripts/slider';
import { bindStickyHeader, syncStickyHeaders } from '../src/scripts/sticky-header';
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
bindStickyHeader(window);
document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[data-locale]') : null;
    const locale = link?.getAttribute('data-locale');
    if (!link || !isLocale(locale)) return;
    event.preventDefault();
    updateGlobals({ locale });
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
                syncSchemeToggles();
                syncSliders();
                syncStickyHeaders();
            });
            return rendered;
        },
    ],
    parameters: {
        layout: 'padded',
        docs: { source: { language: 'html', transform: (code: string) => formatSource(code) } },
        options: { storySort: { order: ['Templates', 'Organisms', 'Molecules', 'Atoms', 'Layout'] } },
    },
};

export default preview;
