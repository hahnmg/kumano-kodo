import { describe, expect, it } from 'vitest';
import { iconButton } from '../../stories/atoms/icon-button.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('icon-button', () => {
    it('names the direction for assistive tech', () => {
        expect(
            mount(iconButton({ direction: 'previous' }))
                .querySelector('button')
                ?.getAttribute('aria-label'),
        ).toBe('Previous');
        expect(
            mount(iconButton({ direction: 'next', label: 'Weiter' }))
                .querySelector('button')
                ?.getAttribute('aria-label'),
        ).toBe('Weiter');
    });
    it('passes axe', () => expectAccessible(iconButton({ direction: 'next' })));
});
