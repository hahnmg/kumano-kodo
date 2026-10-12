import { describe, expect, it } from 'vitest';
import { stat, statRow } from '../../stories/molecules/stat.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('stat', () => {
    it('orders value and label per variant', () => {
        expect(mount(stat({ value: '68', label: 'km' })).querySelector('.stat-value')?.textContent).toBe('68');
        expect(mount(stat({ value: '68 km', label: 'Distance', variant: 'on-image' })).querySelector('p')?.textContent).toBe('Distance');
    });
    it('renders a row of large stats', () =>
        expect(
            mount(
                statRow([
                    { value: '1', label: 'a' },
                    { value: '2', label: 'b' },
                ]),
            ).querySelectorAll('.stat-large'),
        ).toHaveLength(2));
    it('passes axe', () => expectAccessible(stat({ value: '68', label: 'kilometres walked' })));
});
