import { describe, expect, it } from 'vitest';
import { textField } from '../../stories/atoms/text-field.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('text-field', () => {
    it('wraps the input in its label', () => {
        const input = mount(textField({ label: 'Email address', name: 'email', type: 'email' })).querySelector('label input');
        expect(input?.getAttribute('type')).toBe('email');
        expect(input?.getAttribute('name')).toBe('email');
    });
    it('passes axe', () => expectAccessible(textField({ label: 'Email address', name: 'email', placeholder: 'name@example.com' })));
});
