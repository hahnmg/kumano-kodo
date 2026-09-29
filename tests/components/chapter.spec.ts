import { describe, expect, it } from 'vitest';
import { chapter } from '../../stories/organisms/chapter.markup';
import { photos } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
    id: 'day-9',
    number: '9',
    date: 'Day 9',
    title: 'Somewhere',
    text: 'Text.',
    photos: [
        { image: photos['signpost'], span: 4, shift: 1 as const },
        { image: photos['trailhead-river'], span: 8 },
    ],
};

describe('chapter', () => {
    it('labels the section by its heading and keeps the numeral decorative', () => {
        const el = mount(chapter(props));
        expect(el.querySelector('section')?.getAttribute('aria-labelledby')).toBe('day-9');
        expect(el.querySelector('#day-9')?.textContent).toBe('Somewhere');
        expect(el.querySelector('.chapter__number')?.getAttribute('aria-hidden')).toBe('true');
    });
    it('lays photos out by span, shift and orientation', () => {
        const figures = mount(chapter(props)).querySelectorAll('.chapter__photo');
        expect(figures[0].getAttribute('style')).toBe('--span: 4');
        expect(figures[0].classList.contains('chapter__photo--portrait')).toBe(true);
        expect(figures[0].classList.contains('chapter__photo--shift-1')).toBe(true);
        expect(figures[1].classList.contains('chapter__photo--landscape')).toBe(true);
    });
    it('passes axe', () => expectAccessible(chapter(props)));
});
