import { describe, expect, it } from 'vitest';
import { linkTile } from '../../stories/molecules/link-tile.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('link-tile', () => {
    it('is one link with the title as its name', () => {
        const a = mount(linkTile({ title: 'Tierabgabe', href: '/t', icon: 'home' })).querySelector('a');
        expect(a?.getAttribute('href')).toBe('/t');
        expect(a?.textContent?.trim()).toBe('Tierabgabe');
    });
    it('passes axe', () => expectAccessible(linkTile({ title: 'Tierabgabe', href: '#', icon: 'home' })));
});
