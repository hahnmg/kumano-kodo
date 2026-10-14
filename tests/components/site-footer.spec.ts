import { describe, expect, it } from 'vitest';
import { siteFooter } from '../../stories/organisms/site-footer.markup';
import { guide, kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('site-footer', () => {
  it('renders columns, optional notice and legal links', () => {
    expect(mount(siteFooter(kumano.footer)).querySelectorAll('.site-footer-column')).toHaveLength(3);
    expect(mount(siteFooter(kumano.footer)).querySelector('.notice')).toBeNull();
    expect(mount(siteFooter(guide.footer)).querySelector('.notice')).not.toBeNull();
  });
  it('passes axe', () => expectAccessible(siteFooter(guide.footer)));
});
