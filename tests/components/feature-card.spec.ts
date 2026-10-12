import { describe, expect, it } from 'vitest';
import { featureCard } from '../../stories/molecules/feature-card.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('feature-card', () => {
    it('uses a larger title for the featured variant', () => {
        expect(mount(featureCard({ ...kumano.places[0], variant: 'featured' })).querySelector('h3')?.className).toContain('type-h3');
        expect(mount(featureCard({ ...kumano.places[1], variant: 'default' })).querySelector('h3')?.className).toContain('type-h4');
    });
    it('passes axe', () => expectAccessible(featureCard(kumano.places[2])));
});
