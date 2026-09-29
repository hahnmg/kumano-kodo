import { describe, expect, it } from 'vitest';
import { chip } from '../../stories/atoms/chip.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('chip', () => {
    it('marks the active chip as current page', () => {
        expect(
            mount(chip({ label: 'Hunde', href: '#', active: true }))
                .querySelector('a')
                ?.getAttribute('aria-current'),
        ).toBe('page');
        expect(
            mount(chip({ label: 'Katzen', href: '#' }))
                .querySelector('a')
                ?.hasAttribute('aria-current'),
        ).toBe(false);
    });
    it('passes axe', () => expectAccessible(chip({ label: 'Hunde', href: '#', active: true })));
});
