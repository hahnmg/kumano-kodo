import { describe, expect, it } from 'vitest';
import { link } from '../../stories/atoms/link.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('link', () => {
    it('adds the arrow on the side of the direction', () => {
        expect(mount(link({ label: 'Mehr erfahren', href: '#' })).textContent).toBe('Mehr erfahren →');
        expect(mount(link({ label: 'Zurück', href: '#', direction: 'back' })).textContent).toBe('← Zurück');
    });
    it('passes axe', () => expectAccessible(link({ label: 'Mehr erfahren', href: '#' })));
});
