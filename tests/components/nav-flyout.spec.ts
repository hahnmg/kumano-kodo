import { afterEach, describe, expect, it } from 'vitest';
import { bindNavFlyouts } from '../../src/scripts/nav-flyout';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible } from '../support/accessibility';

const toggles = () => [...document.querySelectorAll<HTMLButtonElement>('.site-header__toggle')];

describe('nav-flyout', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('renders menus as disclosure buttons with a mega panel and a dropdown', () => {
        document.body.innerHTML = siteHeader({ nav: kumano.nav });
        expect(toggles()).toHaveLength(2);
        expect(toggles()[0].getAttribute('aria-expanded')).toBe('false');
        const mega = document.querySelector('.site-header__flyout--mega');
        expect(mega?.querySelectorAll('.site-header__mega-column')).toHaveLength(2);
        expect(mega?.querySelector('.rich-text')).not.toBeNull();
        expect(mega?.querySelector('.teaser-card p.teaser-card__title')).not.toBeNull();
        expect(document.querySelector('.site-header__flyout--dropdown a')).not.toBeNull();
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
});
