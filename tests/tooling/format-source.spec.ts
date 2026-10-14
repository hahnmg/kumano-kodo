import { describe, expect, it } from 'vitest';
import { formatSource } from '../../.storybook/format-source';
import { linkTile } from '../../stories/molecules/link-tile.markup';

describe('format-source', () => {
  it('drops style-only wrappers and indents blocks', () => {
    const out = formatSource(`<div style="max-width:640px"><ul class="list"><li><a href="#">One</a></li><li>Two</li></ul></div>`);
    expect(out).toBe(['<ul class="list">', '    <li><a href="#">One</a></li>', '    <li>Two</li>', '</ul>'].join('\n'));
  });
  it('keeps icons on one line and the markup intact', () => {
    const html = linkTile({ title: 'Getting there', href: '#', icon: 'map-pin' });
    const out = formatSource(`<div style="max-width:640px">${html}</div>`);
    expect(out.split('\n')[0]).toBe('<a class="link-tile" href="#">');
    expect(out.split('\n').filter((l) => l.includes('<svg'))).toHaveLength(2);
    const reparsed = document.createElement('template');
    reparsed.innerHTML = out;
    expect(reparsed.content.querySelector('.link-tile-title')?.textContent).toBe('Getting there');
  });
  it('keeps classed or styled-and-classed divs', () => {
    expect(formatSource('<div class="grid" style="gap:1px"><p>x</p></div>')).toBe(
      '<div class="grid" style="gap:1px">\n    <p>x</p>\n</div>',
    );
  });
});
