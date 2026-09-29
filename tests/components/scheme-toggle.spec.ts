import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindSchemeToggle, currentScheme } from '../../src/scripts/scheme-toggle';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { kumano } from '../../stories/templates/content';

describe('scheme-toggle', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('flips the scheme on click and mirrors it in aria-pressed', () => {
        document.documentElement.dataset.scheme = 'light';
        document.body.innerHTML = siteHeader({ nav: kumano.nav });
        const onChange = vi.fn();
        unbind = bindSchemeToggle(document, onChange);
        const button = document.querySelector<HTMLButtonElement>('.site-header__scheme');
        button?.click();
        expect(currentScheme()).toBe('dark');
        expect(button?.getAttribute('aria-pressed')).toBe('true');
        expect(onChange).toHaveBeenCalledWith('dark');
        button?.click();
        expect(document.documentElement.dataset.scheme).toBe('light');
        expect(button?.getAttribute('aria-pressed')).toBe('false');
    });
    it('ignores clicks elsewhere', () => {
        document.documentElement.dataset.scheme = 'light';
        document.body.innerHTML = siteHeader({ nav: kumano.nav });
        unbind = bindSchemeToggle(document);
        document.querySelector<HTMLAnchorElement>('.site-header__link')?.click();
        expect(currentScheme()).toBe('light');
    });
});
