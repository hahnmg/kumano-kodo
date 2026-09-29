import { afterEach, describe, expect, it } from 'vitest';
import { bindMenuToggle } from '../../src/scripts/menu-toggle';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { kumano, languages } from '../../stories/templates/content';

describe('menu-toggle', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('opens and closes the header panel and mirrors it in aria-expanded', () => {
        document.body.innerHTML = siteHeader({ nav: kumano.nav, languages });
        unbind = bindMenuToggle(document);
        const header = document.querySelector('.site-header');
        const button = document.querySelector<HTMLButtonElement>('.site-header__menu');
        button?.click();
        expect(header?.hasAttribute('data-menu-open')).toBe(true);
        expect(button?.getAttribute('aria-expanded')).toBe('true');
        button?.click();
        expect(header?.hasAttribute('data-menu-open')).toBe(false);
        expect(button?.getAttribute('aria-expanded')).toBe('false');
    });
    it('closes on Escape and returns focus to the button', () => {
        document.body.innerHTML = siteHeader({ nav: kumano.nav });
        unbind = bindMenuToggle(document);
        const button = document.querySelector<HTMLButtonElement>('.site-header__menu');
        button?.click();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(document.querySelector('.site-header')?.hasAttribute('data-menu-open')).toBe(false);
        expect(document.activeElement).toBe(button);
    });
});
