import { describe, expect, it } from 'vitest';
import { searchField } from '../../stories/atoms/search-field.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('search-field', () => {
    it('renders a search input', () => {
        expect(
            mount(searchField({ label: 'Suchen', name: 'q' }))
                .querySelector('input')
                ?.getAttribute('type'),
        ).toBe('search');
    });
    it('passes axe', () =>
        expectAccessible(searchField({ label: 'Nach Namen oder Rasse suchen', name: 'q', placeholder: 'z. B. Mischling' })));
});
