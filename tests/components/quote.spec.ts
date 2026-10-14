import { describe, expect, it } from 'vitest';
import { quote } from '../../stories/molecules/quote.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('quote', () => {
  it('uses blockquote with a caption', () => {
    const el = mount(quote({ quote: 'Rain.', source: 'Host' }));
    expect(el.querySelector('blockquote')?.textContent).toBe('Rain.');
    expect(el.querySelector('figcaption')?.textContent).toBe('Host');
  });
  it('passes axe', () => expectAccessible(quote({ quote: 'Rain.', source: 'Host' })));
});
