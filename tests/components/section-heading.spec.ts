import { describe, expect, it } from 'vitest';
import { sectionHeading } from '../../stories/molecules/section-heading.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('section-heading', () => {
  it('renders eyebrow only when given and the chosen level', () => {
    expect(mount(sectionHeading({ title: 'T' })).querySelector('.section-heading-eyebrow')).toBeNull();
    expect(mount(sectionHeading({ title: 'T', eyebrow: 'E', level: 1 })).querySelector('h1')?.textContent).toBe('T');
  });
  it('adds aside or controls by variant', () => {
    expect(
      mount(sectionHeading({ title: 'T', variant: 'with-aside', aside: 'A' })).querySelector('.section-heading-aside')?.textContent,
    ).toBe('A');
    expect(mount(sectionHeading({ title: 'T', variant: 'with-controls' })).querySelectorAll('button')).toHaveLength(2);
  });
  it('passes axe', () => expectAccessible(sectionHeading({ title: 'Stages', eyebrow: 'Stages', variant: 'with-controls' })));
});
