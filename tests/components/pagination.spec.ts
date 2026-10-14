import { describe, expect, it } from 'vitest';
import { pagination } from '../../stories/molecules/pagination.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('pagination', () => {
  it('marks the current page and collapses gaps', () => {
    const el = mount(pagination({ current: 1, total: 5, href: (p) => `?p=${p}` }));
    expect(el.querySelector('[aria-current="page"]')?.textContent).toBe('1');
    expect(el.textContent).toContain('…');
    expect(el.querySelector('[aria-label="Previous page"]')).toBeNull();
    expect(el.querySelector('[aria-label="Next page"]')?.getAttribute('href')).toBe('?p=2');
  });
  it('passes axe', () => expectAccessible(pagination({ current: 3, total: 9, href: (p) => `?p=${p}` })));
});
