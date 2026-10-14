import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindSchemeToggle, currentScheme, rememberScheme, schemeKey } from '../../src/scripts/scheme-toggle';
import { schemeToggle } from '../../stories/atoms/scheme-toggle.markup';
import { expectAccessible, mount } from '../support/accessibility';
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
    const button = document.querySelector<HTMLButtonElement>('.scheme-toggle');
    button?.click();
    expect(currentScheme()).toBe('dark');
    expect(button?.getAttribute('aria-pressed')).toBe('true');
    expect(onChange).toHaveBeenCalledWith('dark');
    button?.click();
    expect(document.documentElement.dataset.scheme).toBe('light');
    expect(button?.getAttribute('aria-pressed')).toBe('false');
  });
  it('keeps the choice in the browser, and carries on where storage is blocked', () => {
    rememberScheme('dark');
    expect(localStorage.getItem(schemeKey)).toBe('dark');
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => rememberScheme('light')).not.toThrow();
    setItem.mockRestore();
    localStorage.removeItem(schemeKey);
  });
  it('ignores clicks elsewhere', () => {
    document.documentElement.dataset.scheme = 'light';
    document.body.innerHTML = siteHeader({ nav: kumano.nav });
    unbind = bindSchemeToggle(document);
    document.querySelector<HTMLAnchorElement>('.site-header-link')?.click();
    expect(currentScheme()).toBe('light');
  });
  it('renders a labelled pressed-state button', () => {
    const button = mount(schemeToggle({ label: 'Dunkler Modus', pressed: true })).querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Dunkler Modus');
    expect(button?.getAttribute('aria-pressed')).toBe('true');
  });
  it('passes axe', () => expectAccessible(schemeToggle()));
});
