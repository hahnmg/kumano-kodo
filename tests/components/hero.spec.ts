import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindSlideshows, bindSliders } from '../../src/scripts/slider';
import { hero, heroSlides } from '../../stories/organisms/hero.markup';
import { content, kumano } from '../../stories/templates/content';
import { heroSlidesOf } from '../../stories/templates/kumano-home.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('hero', () => {
  it('has one h1, a light and an outline action and the stats', () => {
    const el = mount(hero(kumano.hero));
    expect(el.querySelectorAll('h1')).toHaveLength(1);
    expect(el.querySelector('.button-light')?.textContent).toBe(kumano.hero.actions[0].label);
    expect(el.querySelector('.button-outline')).not.toBeNull();
    expect(el.querySelectorAll('.stat-on-image')).toHaveLength(4);
  });
  it('steps its title down to h2 below a page heading', () => {
    const el = mount(hero({ ...kumano.hero, level: 2 }));
    expect(el.querySelector('h1')).toBeNull();
    expect(el.querySelector('h2.hero-title')?.textContent).toBe(kumano.hero.title);
  });
  it('passes axe', () => expectAccessible(hero(kumano.hero)));
});

describe('hero slides', () => {
  const props = heroSlidesOf(content('en'));
  const unbind: (() => void)[] = [];
  afterEach(() => {
    unbind.splice(0).forEach((u) => u());
    vi.useRealTimers();
  });
  // jsdom has no layout: three slides of 1440px, as at that width.
  const layout = () => {
    const track = document.querySelector<HTMLElement>('.hero-track')!;
    [...track.children].forEach((c, i) => Object.defineProperty(c, 'offsetLeft', { value: i * 1440, configurable: true }));
    Object.defineProperty(track, 'clientWidth', { value: 1440, configurable: true });
    Object.defineProperty(track, 'scrollWidth', { value: 4320, configurable: true });
    track.scrollTo = ((o: ScrollToOptions) => (track.dataset.sliderTarget = String(o.left ?? 0))) as typeof track.scrollTo;
    return track;
  };
  const current = () => document.querySelector('.slider-dots-dot[aria-current]')?.getAttribute('aria-label');
  // jsdom has no matchMedia; the slideshow only asks it about reduced motion.
  const motion = (reduce: boolean) =>
    Object.defineProperty(window, 'matchMedia', {
      value: (query: string) => ({ matches: reduce && query.includes('reduce') }) as MediaQueryList,
      configurable: true,
      writable: true,
    });

  it('names each slide and keeps one h1', () => {
    const el = mount(heroSlides(props));
    expect(el.querySelectorAll('.hero-slide')).toHaveLength(3);
    expect(el.querySelector('.hero-slide')?.getAttribute('aria-label')).toBe('Slide 1 of 3');
    expect(el.querySelectorAll('h1')).toHaveLength(1);
    expect(el.querySelectorAll('h2.hero-title')).toHaveLength(2);
  });
  it('has no h1 at all below a page heading', () => {
    const el = mount(heroSlides({ ...props, level: 2 }));
    expect(el.querySelector('h1')).toBeNull();
    expect(el.querySelectorAll('h2.hero-title')).toHaveLength(3);
  });
  it('moves on by itself, starts over at the end, and holds when paused', () => {
    vi.useFakeTimers();
    motion(false);
    document.body.innerHTML = heroSlides(props);
    layout();
    unbind.push(bindSliders(document), bindSlideshows(document));
    vi.advanceTimersByTime(7500);
    expect(current()).toBe('Slide 2');
    vi.advanceTimersByTime(7500);
    vi.advanceTimersByTime(7500);
    expect(current()).toBe('Slide 1');
    const pause = document.querySelector<HTMLButtonElement>('.hero-pause')!;
    pause.click();
    expect(pause.getAttribute('aria-pressed')).toBe('true');
    expect(pause.getAttribute('aria-label')).toBe('Play');
    expect(document.querySelector('.hero-track')?.getAttribute('aria-live')).toBe('polite');
    vi.advanceTimersByTime(20000);
    expect(current()).toBe('Slide 1');
  });
  it('starts paused for visitors who ask for less motion', () => {
    motion(true);
    document.body.innerHTML = heroSlides(props);
    unbind.push(bindSlideshows(document));
    expect(document.querySelector('.hero-pause')?.getAttribute('aria-pressed')).toBe('true');
  });
  it('passes axe', () => expectAccessible(heroSlides(props)));
});
