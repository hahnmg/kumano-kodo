import { afterEach, describe, expect, it } from 'vitest';
import { bindNavFlyouts } from '../../src/scripts/nav-flyout';
import { navFlyout } from '../../stories/molecules/nav-flyout.markup';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible } from '../support/accessibility';

const toggles = () => [...document.querySelectorAll<HTMLButtonElement>('.site-header-toggle')];

describe('nav-flyout', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('renders menus as disclosure buttons with a mega panel and a dropdown', () => {
        document.body.innerHTML = siteHeader({ nav: kumano.nav });
        expect(toggles()).toHaveLength(2);
        expect(toggles()[0].getAttribute('aria-expanded')).toBe('false');
        const mega = document.querySelector('.nav-flyout-mega');
        expect(mega?.querySelectorAll('.nav-flyout-column')).toHaveLength(2);
        expect(mega?.querySelector('.rich-text')).not.toBeNull();
        expect(mega?.querySelector('.teaser-card p.teaser-card-title')).not.toBeNull();
        expect(document.querySelector('.nav-flyout-dropdown a')).not.toBeNull();
    });
    it('opens one flyout at a time and closes on Escape and outside clicks', () => {
        document.body.innerHTML = siteHeader({ nav: kumano.nav }) + '<main><p>Page</p></main>';
        unbind = bindNavFlyouts(document);
        const [route, practical] = toggles();
        route.click();
        expect(route.getAttribute('aria-expanded')).toBe('true');
        practical.click();
        expect(route.getAttribute('aria-expanded')).toBe('false');
        expect(practical.closest('[data-open]')).not.toBeNull();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(practical.getAttribute('aria-expanded')).toBe('false');
        expect(document.activeElement).toBe(practical);
        route.click();
        document.querySelector<HTMLElement>('main p')?.click();
        expect(route.getAttribute('aria-expanded')).toBe('false');
    });
    it('passes axe with the mega panel open', () =>
        expectAccessible(siteHeader({ nav: kumano.nav.map((n, i) => ({ ...n, open: i === 0 })) }), true));
    it('renders on its own, dropdown and mega', () => {
        const [route, practical] = kumano.nav;
        document.body.innerHTML = route.menu && practical.menu ? navFlyout(route.menu) + navFlyout(practical.menu) : '';
        expect(document.querySelectorAll('.nav-flyout-mega .nav-flyout-column')).toHaveLength(2);
        expect(document.querySelector('.nav-flyout-mega .teaser-card')).not.toBeNull();
        expect(document.querySelectorAll('.nav-flyout-dropdown a').length).toBeGreaterThan(1);
    });
});
