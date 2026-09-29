import { describe, expect, it } from 'vitest';
import { chip } from '../../stories/atoms/chip.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('chip', () => {
    it('marks the active chip as current page', () => {
        expect(
            mount(chip({ label: 'Stages', href: '#', active: true }))
                .querySelector('a')
                ?.getAttribute('aria-current'),
        ).toBe('page');
        expect(
            mount(chip({ label: 'Places', href: '#' }))
                .querySelector('a')
                ?.hasAttribute('aria-current'),
        ).toBe(false);
    });
    it('passes axe', () => expectAccessible(chip({ label: 'Stages', href: '#', active: true })));
});
