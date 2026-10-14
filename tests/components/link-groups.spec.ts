import { describe, expect, it } from 'vitest';
import { linkGroups } from '../../stories/molecules/link-groups.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
  groups: [
    {
      title: 'Text',
      links: [
        { label: 'Text', href: '#text' },
        { label: 'Text with a table', href: '#table' },
      ],
    },
    { title: 'Images', links: [{ label: 'Gallery', href: '#gallery' }] },
  ],
};

describe('link-groups', () => {
  it('heads each group and lists its links', () => {
    const el = mount(linkGroups(props));
    expect([...el.querySelectorAll('h3')].map((h) => h.textContent)).toEqual(['Text', 'Images']);
    expect(el.querySelectorAll('.link-group-list a')).toHaveLength(3);
  });
  it('passes axe', () => expectAccessible(`<h2>Contents</h2>${linkGroups(props)}`));
});
