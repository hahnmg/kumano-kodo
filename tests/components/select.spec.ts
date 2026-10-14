import { describe, expect, it } from 'vitest';
import { select } from '../../stories/atoms/select.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('select', () => {
  it('selects the given value', () => {
    const el = mount(select({ label: 'Day', name: 'day', options: ['All days', 'Day 3'], value: 'Day 3' })).querySelector('select');
    expect((el as HTMLSelectElement).value).toBe('Day 3');
  });
  it('passes axe', () => expectAccessible(select({ label: 'Day', name: 'day', options: ['All days', 'Day 3', 'Day 4'] })));
});
