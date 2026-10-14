import { describe, expect, it } from 'vitest';
import { center, cluster, grid, rail, section, split, stack } from '../../stories/layout/layout.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('layout', () => {
  it('builds sections with tone, space and bleed', () => {
    const el = mount(section({ content: 'x', tone: 'sunk', space: 'large', bleed: true, label: 'L' }));
    expect(el.querySelector('section')?.className).toBe('section section-sunk section-space-large section-bleed');
    expect(el.querySelector('section')?.getAttribute('aria-label')).toBe('L');
  });
  it('wraps items in grid, split, stack, rail, center and cluster', () => {
    expect(mount(grid(['a', 'b'], 2)).querySelector('.grid-2')?.textContent).toBe('ab');
    expect(mount(split('a', 'b', 'content-sidebar')).querySelector('.split-content-sidebar')?.children).toHaveLength(2);
    const gap = (g?: Parameters<typeof stack>[1]) =>
      mount(stack(['a'], g))
        .querySelector('.stack')
        ?.getAttribute('style');
    expect(gap('heading')).toContain('--section-heading-gap');
    expect(gap('elements')).toContain('--section-element-gap');
    expect(gap()).toContain('--column-element-gap');
    expect(gap(16)).toContain('--space-16');
    expect(mount(rail(['a']) + center('b') + cluster(['c'])).querySelectorAll('.rail, .center, .cluster')).toHaveLength(3);
  });
  it('sets one column of a split as the colour box', () => {
    expect(mount(split('a', 'b', 'heading-content', 'start', 'first')).querySelector('.split')?.className).toContain('split-colour-first');
    expect(mount(split('a', 'b')).querySelector('.split')?.className).not.toContain('split-colour');
  });
  it('passes axe with a colour box', () =>
    expectAccessible(
      split('<h2 class="type-h2">Questions</h2><p><a href="#">Link</a></p>', '<p>Text</p>', 'heading-content', 'start', 'first'),
    ));
  it('passes axe', () => expectAccessible(section({ content: '<p>Text</p>' })));
});
