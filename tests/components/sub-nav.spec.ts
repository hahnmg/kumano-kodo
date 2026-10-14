import { describe, expect, it } from 'vitest';
import { subNav } from '../../stories/molecules/sub-nav.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
  title: 'The route',
  items: [
    { label: 'Team', href: '/team', active: true },
    { label: 'Stage 04 · Koguchi → Nachi', href: '/stage-4' },
  ],
};

describe('sub-nav', () => {
  it('labels the nav and marks the current page', () => {
    const el = mount(subNav(props));
    expect(el.querySelector('nav')?.getAttribute('aria-label')).toBe('The route');
    expect(el.querySelector('[aria-current="page"]')?.textContent).toBe('Team');
  });
  it('passes axe', () => expectAccessible(subNav(props)));
});
