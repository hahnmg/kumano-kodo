import { describe, expect, it } from 'vitest';
import { logo } from '../../stories/atoms/logo.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('logo', () => {
    it('links home with an accessible name and two themed parts', () => {
        const a = mount(logo()).querySelector('a.logo');
        expect(a?.getAttribute('href')).toBe('/');
        expect(a?.getAttribute('aria-label')).toBe('Kumano Kodo');
        expect(a?.querySelector('.logo__bird')?.getAttribute('fill')).toBe('currentColor');
        expect(a?.querySelector('.logo__wordmark')?.getAttribute('fill')).toBe('currentColor');
    });
    it('passes axe', () => expectAccessible(logo()));
});
