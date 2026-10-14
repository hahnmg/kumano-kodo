import { describe, expect, it } from 'vitest';
import { portraitCard } from '../../stories/molecules/portrait-card.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('portrait-card', () => {
  it('renders image, stage, stats and title', () => {
    const el = mount(portraitCard(kumano.stages[0]));
    expect(el.querySelector('img')?.getAttribute('alt')).toBe(kumano.stages[0].image.alt);
    expect(el.querySelector('.portrait-card-label')?.textContent).toBe(kumano.stages[0].stage);
    expect(el.querySelector('h3')?.textContent).toBe(kumano.stages[0].title);
  });
  it('links the title to its day, and stays plain without a target', () => {
    const el = mount(portraitCard(kumano.stages[0]));
    expect(el.querySelector('h3 a')?.getAttribute('href')).toBe(kumano.stages[0].href);
    expect(portraitCard({ ...kumano.stages[0], href: undefined })).not.toContain('<a ');
  });
  it('passes axe', () => expectAccessible(portraitCard(kumano.stages[0])));
  it('passes axe without a link', () => expectAccessible(portraitCard({ ...kumano.stages[0], href: undefined })));
});
