import { describe, expect, it } from 'vitest';
import { radio } from '../../stories/atoms/radio.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('radio', () => {
    it('renders a radio with value', () => {
        const input = mount(radio({ label: 'Nakahechi', name: 'a', value: 'nakahechi', checked: true })).querySelector(
            'input',
        ) as HTMLInputElement;
        expect(input.type).toBe('radio');
        expect(input.value).toBe('nakahechi');
        expect(input.checked).toBe(true);
    });
    it('passes axe', () => expectAccessible(radio({ label: 'Nakahechi', name: 'route', value: 'nakahechi' })));
});
