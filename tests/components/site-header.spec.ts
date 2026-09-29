import { describe, expect, it } from 'vitest';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { guide, kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('site-header', () => {
    it('marks the active nav item and offers themes', () => {
        const el = mount(siteHeader({ nav: kumano.nav, languages: kumano.languages }));
        expect(el.querySelector('nav [aria-current="page"]')?.textContent).toBe('The route');
        expect(el.querySelectorAll('[data-theme-value]')).toHaveLength(4);
        expect(mount(siteHeader({ nav: guide.nav, themes: false })).querySelector('[data-theme-value]')).toBeNull();
    });
    it('passes axe', () => expectAccessible(siteHeader({ nav: kumano.nav, languages: kumano.languages })));
});
