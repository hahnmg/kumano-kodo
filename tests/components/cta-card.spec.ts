import { describe, expect, it } from 'vitest';
import { ctaCard } from '../../stories/molecules/cta-card.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { title: 'Spenden', text: 'Jede Spende hilft.', linkLabel: 'Mehr erfahren', href: '#' };

describe('cta-card', () => {
    it('marks the featured variant', () => {
        expect(mount(ctaCard({ ...props, variant: 'featured' })).querySelector('.cta-card--featured')).not.toBeNull();
        expect(mount(ctaCard(props)).querySelector('a')?.textContent).toBe('Mehr erfahren →');
    });
    it('passes axe', () => expectAccessible(ctaCard(props)));
});
