import { describe, expect, it } from 'vitest';
import { personCard } from '../../stories/molecules/person-card.markup';
import { guide } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('person-card', () => {
    it('renders avatar, name, role and focus', () => {
        const el = mount(personCard(guide.hosts[0]));
        expect(el.querySelector('img.avatar--large')).not.toBeNull();
        expect(el.querySelector('h3')?.textContent).toBe(guide.hosts[0].name);
        expect(el.querySelector('.person-card__focus')?.textContent).toBe(guide.hosts[0].focus);
    });
    it('passes axe', () => expectAccessible(personCard(guide.hosts[0])));
});
