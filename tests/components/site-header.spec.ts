import { describe, expect, it } from 'vitest';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { content, kumano, languages } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('site-header', () => {
    it('marks the active nav item and language, without a theme picker', () => {
        const el = mount(siteHeader({ nav: kumano.nav, languages }));
        expect(el.querySelector('nav [aria-current="page"]')?.textContent).toBe('The route');
        expect(el.querySelector('.site-header__languages [aria-current="true"]')?.getAttribute('data-locale')).toBe('en');
        expect(el.querySelector('[data-theme-value]')).toBeNull();
    });
    it('offers the scheme toggle as a pressed-state button', () => {
        const button = mount(siteHeader({ nav: kumano.nav })).querySelector('.site-header__scheme');
        expect(button?.getAttribute('aria-pressed')).toBe('false');
        expect(button?.getAttribute('aria-label')).toBe('Dark mode');
    });
    it('takes translated labels', () => {
        const { ui, languages: ja } = content('ja');
        const el = mount(
            siteHeader({
                nav: kumano.nav,
                languages: ja,
                labels: { nav: ui.mainNav, languages: ui.language, scheme: ui.darkMode, menu: ui.menu },
            }),
        );
        expect(el.querySelector('.site-header__nav')?.getAttribute('aria-label')).toBe(ui.mainNav);
        expect(el.querySelector('[aria-current="true"]')?.getAttribute('lang')).toBe('ja');
    });
    it('passes axe', () => expectAccessible(siteHeader({ nav: kumano.nav, languages })));
});
