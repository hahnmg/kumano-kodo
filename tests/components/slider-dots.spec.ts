import { describe, expect, it } from 'vitest';
import { sliderDots } from '../../stories/atoms/slider-dots.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('slider-dots', () => {
    it('renders one labelled dot per card and marks the active one', () => {
        const dots = mount(sliderDots({ count: 5, active: 2 })).querySelectorAll('button');
        expect(dots).toHaveLength(5);
        expect(dots[2].getAttribute('aria-current')).toBe('true');
        expect(dots[0].getAttribute('aria-label')).toBe('Karte 1');
    });
    it('passes axe', () => expectAccessible(sliderDots({ count: 5 })));
});
