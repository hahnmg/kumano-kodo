import { describe, expect, it } from 'vitest';
import { downloadList } from '../../stories/molecules/download-list.markup';
import { expectAccessible, mount } from '../support/accessibility';

const items = [{ title: 'Vertrag', meta: 'PDF · 240 KB', href: '/v.pdf' }];

describe('download-list', () => {
  it('marks links as downloads', () => {
    expect(mount(downloadList({ items })).querySelector('a')?.hasAttribute('download')).toBe(true);
  });
  it('passes axe', () => expectAccessible(downloadList({ items })));
});
