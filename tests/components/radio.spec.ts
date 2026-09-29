import { describe, expect, it } from 'vitest';
import { radio } from '../../stories/atoms/radio.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('radio', () => {
    it('renders a radio with value', () => {
        const input = mount(radio({ label: 'Hund', name: 'a', value: 'dog', checked: true })).querySelector('input') as HTMLInputElement;
        expect(input.type).toBe('radio');
        expect(input.value).toBe('dog');
        expect(input.checked).toBe(true);
    });
    it('passes axe', () => expectAccessible(radio({ label: 'Hund', name: 'animal', value: 'dog' })));
});
