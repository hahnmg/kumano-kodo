import { describe, expect, it } from 'vitest';
import { teaserCard } from '../../stories/molecules/teaser-card.markup';
import { demo } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('teaser-card', () => {
    it('links the title and shows the badge only when given', () => {
        expect(
            mount(teaserCard({ ...demo.animals[0], href: '/x' }))
                .querySelector('h3 a')
                ?.getAttribute('href'),
        ).toBe('/x');
        expect(mount(teaserCard({ ...demo.animals[0], href: '/x' })).querySelector('.badge')).toBeNull();
        expect(mount(teaserCard({ ...demo.animals[2], href: '/x' })).querySelector('.badge')?.textContent).toBe('älteres Tier');
    });
    it('sets the heading level', () =>
        expect(mount(teaserCard({ ...demo.animals[0], href: '#', level: 2 })).querySelector('h2')).not.toBeNull());
    it('passes axe', () => expectAccessible(teaserCard({ ...demo.animals[2], href: '#' })));
});
