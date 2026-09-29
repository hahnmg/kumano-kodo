import { describe, expect, it } from 'vitest';
import { dayList } from '../../stories/molecules/day-row.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('day-row', () => {
    it('renders an ordered list of days', () => {
        const el = mount(dayList(kumano.days));
        expect(el.querySelectorAll('ol.day-list > li.day-row')).toHaveLength(4);
        expect(el.querySelector('.day-row__route')?.textContent).toBe('Takijiri → Takahara');
    });
    it('passes axe', () => expectAccessible(dayList(kumano.days)));
});
