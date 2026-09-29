import { afterEach, describe, expect, it } from 'vitest';
import { bindSliders, stops, syncSliders } from '../../src/scripts/slider';
import { stageCard } from '../../stories/molecules/stage-card.markup';
import { slider } from '../../stories/organisms/slider.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible } from '../support/accessibility';

const html = () =>
    slider({
        heading: { title: 'Stages', eyebrow: 'Stages' },
        items: kumano.stages.map(stageCard),
        labels: { previous: 'Zurück', next: 'Weiter' },
    });

// jsdom has no layout: give the track the geometry measured at 1440px (five 420px cards, 24px gap, 868px to scroll).
const layout = () => {
    const track = document.querySelector<HTMLElement>('.slider__track')!;
    [...track.children].forEach((c, i) => Object.defineProperty(c, 'offsetLeft', { value: 56 + i * 444, configurable: true }));
    Object.defineProperty(track, 'clientWidth', { value: 1440, configurable: true });
    Object.defineProperty(track, 'scrollWidth', { value: 2308, configurable: true });
    let left = 0;
    Object.defineProperty(track, 'scrollLeft', { get: () => left, set: (v) => (left = v), configurable: true });
    const calls: number[] = [];
    track.scrollTo = ((o: ScrollToOptions) => calls.push(o.left ?? 0)) as typeof track.scrollTo;
    return { track, calls, land: (v: number) => (left = v) };
};
const dots = () => [...document.querySelectorAll<HTMLButtonElement>('.slider-dots__dot')];
const button = (d: string) => document.querySelector<HTMLButtonElement>(`[data-direction="${d}"]`)!;

describe('slider', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('renders arrows, a focusable track and one dot per item', () => {
        document.body.innerHTML = html();
        expect(button('next').getAttribute('aria-label')).toBe('Weiter');
        expect(document.querySelector('.slider__track')?.getAttribute('tabindex')).toBe('0');
        expect(dots()).toHaveLength(kumano.stages.length);
    });
    it('only offers stops the track can reach', () => {
        document.body.innerHTML = html();
        const { track } = layout();
        expect(stops(track)).toEqual([0, 444, 868]);
        syncSliders();
        expect(dots().filter((d) => !d.hidden)).toHaveLength(3);
        expect(button('previous').disabled).toBe(true);
    });
    it('steps back from the end and adds up quick clicks', () => {
        document.body.innerHTML = html();
        unbind = bindSliders(document);
        const { calls, land } = layout();
        button('next').click();
        button('next').click();
        expect(calls).toEqual([444, 868]);
        land(868);
        syncSliders();
        expect(button('next').disabled).toBe(true);
        button('previous').click();
        expect(calls.at(-1)).toBe(444);
    });
    it('jumps to a dot and follows keys', () => {
        document.body.innerHTML = html();
        unbind = bindSliders(document);
        const { track, calls, land } = layout();
        dots()[2].click();
        expect(calls.at(-1)).toBe(868);
        land(868);
        syncSliders();
        track.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        expect(calls.at(-1)).toBe(444);
    });
    it('passes axe', () => expectAccessible(html()));
});
