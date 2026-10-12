import { describe, expect, it } from 'vitest';
import { menuButton } from '../../stories/atoms/menu-button.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('menu-button', () => {
    it('is a labelled button with its expanded state', () => {
        const button = mount(menuButton({ label: 'Menü', expanded: true })).querySelector('button');
        expect(button?.getAttribute('aria-label')).toBe('Menü');
        expect(button?.getAttribute('aria-expanded')).toBe('true');
        expect(button?.querySelectorAll('.menu-button-bar')).toHaveLength(2);
    });
    it('passes axe', () => expectAccessible(menuButton()));
});
