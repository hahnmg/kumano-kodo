import { describe, expect, it } from 'vitest';
import { placeCard } from '../../stories/molecules/place-card.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('place-card', () => {
    it('uses a larger title for the featured variant', () => {
        expect(mount(placeCard({ ...kumano.places[0], variant: 'featured' })).querySelector('h3')?.className).toContain('type-h3');
        expect(mount(placeCard({ ...kumano.places[1], variant: 'default' })).querySelector('h3')?.className).toContain('type-h4');
    });
    it('passes axe', () => expectAccessible(placeCard(kumano.places[2])));
});
