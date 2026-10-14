import { describe, expect, it } from 'vitest';
import { ctaCard } from '../../stories/molecules/cta-card.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
  title: 'Pack for rain',
  text: 'It rains on the Kii peninsula more than almost anywhere in Japan.',
  linkLabel: 'Read more',
  href: '#',
};

describe('cta-card', () => {
  it('marks the featured variant', () => {
    expect(mount(ctaCard({ ...props, variant: 'featured' })).querySelector('.cta-card-featured')).not.toBeNull();
    expect(mount(ctaCard(props)).querySelector('a')?.textContent).toBe('Read more →');
  });
  it('takes the colour edge only when asked', () => {
    expect(mount(ctaCard({ ...props, edge: true })).querySelector('.cta-card-edge')).not.toBeNull();
    expect(mount(ctaCard(props)).querySelector('.cta-card-edge')).toBeNull();
  });
  it('passes axe', () => expectAccessible(ctaCard(props)));
});
