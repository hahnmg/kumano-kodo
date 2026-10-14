import { describe, expect, it } from 'vitest';
import { highlight } from '../../stories/molecules/highlight.markup';
import { content } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

const { crow } = content('en').home;

describe('highlight', () => {
  it('shows the decorative bird next to a heading and text', () => {
    const el = mount(highlight(crow));
    expect(el.querySelector('svg.highlight-emblem')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelector('h2')?.textContent).toBe(crow.title);
    expect(mount(highlight({ ...crow, level: 3 })).querySelector('h3')).not.toBeNull();
  });
  it('passes axe', () => expectAccessible(highlight(crow)));
});
