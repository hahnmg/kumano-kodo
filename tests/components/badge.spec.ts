import { describe, expect, it } from 'vitest';
import { badge } from '../../stories/atoms/badge.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('badge', () => {
  it('renders the label', () =>
    expect(mount(badge({ label: 'Longest stage' })).querySelector('.badge')?.textContent).toBe('Longest stage'));
  it('passes axe', () => expectAccessible(badge({ label: 'Longest stage' })));
});
