import { describe, expect, it } from 'vitest';
import { link } from '../../stories/atoms/link.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('link', () => {
  it('adds the arrow on the side of the direction', () => {
    expect(mount(link({ label: 'Read more', href: '#' })).textContent).toBe('Read more →');
    expect(mount(link({ label: 'All stages', href: '#', direction: 'back' })).textContent).toBe('← All stages');
  });
  it('passes axe', () => expectAccessible(link({ label: 'Read more', href: '#' })));
});
