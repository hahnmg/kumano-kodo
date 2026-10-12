import { describe, expect, it } from 'vitest';
import { timeline } from '../../stories/molecules/timeline-item.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('timeline-item', () => {
    it('renders an ordered list of days', () => {
        const el = mount(timeline(kumano.days));
        expect(el.querySelectorAll('ol.timeline > li.timeline-item')).toHaveLength(4);
        expect(el.querySelector('.timeline-item-title')?.textContent).toBe('Takijiri → Takahara');
    });
    it('passes axe', () => expectAccessible(timeline(kumano.days)));
});
