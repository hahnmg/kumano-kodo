import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindSliders, syncSliders } from '../../src/scripts/slider';
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

describe('slider', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('renders arrows, a focusable track and one dot per item', () => {
        document.body.innerHTML = html();
        expect(document.querySelector('[data-direction="next"]')?.getAttribute('aria-label')).toBe('Weiter');
        expect(document.querySelector('.slider__track')?.getAttribute('tabindex')).toBe('0');
        expect(document.querySelectorAll('.slider-dots__dot')).toHaveLength(kumano.stages.length);
    });
    it('disables the previous arrow at the start', () => {
        document.body.innerHTML = html();
        syncSliders();
        expect(document.querySelector<HTMLButtonElement>('[data-direction="previous"]')?.disabled).toBe(true);
    });
    it('scrolls the track from arrows, dots and keys', () => {
        document.body.innerHTML = html();
        unbind = bindSliders(document);
        const track = document.querySelector<HTMLElement>('.slider__track')!;
        const scrollTo = vi.fn();
        track.scrollTo = scrollTo as unknown as typeof track.scrollTo;
        document.querySelector<HTMLButtonElement>('[data-direction="next"]')?.click();
        document.querySelectorAll<HTMLButtonElement>('.slider-dots__dot')[3].click();
        track.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        expect(scrollTo).toHaveBeenCalledTimes(3);
    });
    it('passes axe', () => expectAccessible(html()));
});
