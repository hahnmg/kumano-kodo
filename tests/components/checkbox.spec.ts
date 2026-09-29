import { describe, expect, it } from 'vitest';
import { checkbox } from '../../stories/atoms/checkbox.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('checkbox', () => {
    it('reflects checked and required', () => {
        const input = mount(checkbox({ label: 'OK', name: 'c', checked: true, required: true })).querySelector('input') as HTMLInputElement;
        expect(input.checked).toBe(true);
        expect(input.required).toBe(true);
    });
    it('passes axe', () => expectAccessible(checkbox({ label: 'I would like to receive the newsletter.', name: 'consent' })));
});
