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
    const button = document.querySelector<HTMLButtonElement>('.menu-button');
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
    const button = document.querySelector<HTMLButtonElement>('.menu-button');
    button?.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.querySelector('.site-header')?.hasAttribute('data-menu-open')).toBe(false);
    expect(document.activeElement).toBe(button);
  });
  it('closes when focus moves past it into the page', () => {
    document.body.innerHTML = `${siteHeader({ nav: kumano.nav })}<main><a href="#">Page</a></main>`;
    unbind = bindMenuToggle(document);
    const header = document.querySelector('.site-header');
    const button = document.querySelector<HTMLButtonElement>('.menu-button');
    button?.click();
    button?.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: header?.querySelector('a') }));
    expect(header?.hasAttribute('data-menu-open')).toBe(true);
    button?.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: document.querySelector('main a') }));
    expect(header?.hasAttribute('data-menu-open')).toBe(false);
  });
});
