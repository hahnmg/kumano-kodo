import { describe, expect, it } from 'vitest';
import { icon, iconNames } from '../../stories/atoms/icon.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('icon', () => {
    it('is decorative by default and labelled when asked', () => {
        expect(
            mount(icon({ name: 'clock' }))
                .querySelector('svg')
                ?.getAttribute('aria-hidden'),
        ).toBe('true');
        const labelled = mount(icon({ name: 'clock', label: 'Uhrzeit' })).querySelector('svg');
        expect(labelled?.getAttribute('role')).toBe('img');
        expect(labelled?.getAttribute('aria-label')).toBe('Uhrzeit');
    });
    it('renders every glyph', () => {
        for (const name of iconNames) expect(mount(icon({ name })).querySelector('svg path, svg circle')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(icon({ name: 'mail', label: 'E-Mail' })));
});
