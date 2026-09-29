import { describe, expect, it } from 'vitest';
import { center, cluster, grid, rail, section, split, stack } from '../../stories/layout/layout.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('layout', () => {
    it('builds sections with tone, space and bleed', () => {
        const el = mount(section({ content: 'x', tone: 'sunk', space: 'large', bleed: true, label: 'L' }));
        expect(el.querySelector('section')?.className).toBe('section section--sunk section--space-large section--bleed');
        expect(el.querySelector('section')?.getAttribute('aria-label')).toBe('L');
    });
    it('wraps items in grid, split, stack, rail, center and cluster', () => {
        expect(mount(grid(['a', 'b'], 2)).querySelector('.grid--2')?.textContent).toBe('ab');
        expect(mount(split('a', 'b', 'content-sidebar')).querySelector('.split--content-sidebar')?.children).toHaveLength(2);
        expect(
            mount(stack(['a'], 56))
                .querySelector('.stack')
                ?.getAttribute('style'),
        ).toContain('--space-56');
        expect(mount(rail(['a']) + center('b') + cluster(['c'])).querySelectorAll('.rail, .center, .cluster')).toHaveLength(3);
    });
    it('passes axe', () => expectAccessible(section({ content: '<p>Text</p>' })));
});
