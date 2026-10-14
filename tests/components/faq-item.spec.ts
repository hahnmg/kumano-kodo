import { describe, expect, it } from 'vitest';
import { faqItem, faqList } from '../../stories/molecules/faq-item.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('faq-item', () => {
  it('uses details and reflects open', () => {
    expect((mount(faqItem(kumano.faq[0])).querySelector('details') as HTMLDetailsElement).open).toBe(true);
    expect((mount(faqItem(kumano.faq[1])).querySelector('details') as HTMLDetailsElement).open).toBe(false);
  });
  it('passes axe', () => expectAccessible(faqList(kumano.faq)));
});
