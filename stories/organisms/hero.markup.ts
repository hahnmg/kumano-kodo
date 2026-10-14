import { attrs, esc, fill, img, type Image } from '../../src/lib/html';
import { iconButton } from '../atoms/icon-button.markup';
import { sliderDots } from '../atoms/slider-dots.markup';
import { button } from '../atoms/button.markup';
import { stat } from '../molecules/stat.markup';

export interface HeroProps {
  image: Image;
  eyebrow: string;
  title: string;
  teaser: string;
  actions: { label: string; href: string }[];
  stats: { label: string; value: string }[];
}

export const hero = ({ image, eyebrow, title, teaser, actions, stats }: HeroProps): string =>
  `<section class="hero">${img(image, 'hero-image', '100vw', true)}<div class="hero-shade"></div><div class="hero-content">` +
  `<p class="hero-eyebrow type-label">${esc(eyebrow)}</p>` +
  `<h1 class="hero-title type-hero">${esc(title)}</h1>` +
  `<div class="hero-teaser"><p class="type-lead">${esc(teaser)}</p><div class="hero-actions">` +
  actions.map((a, i) => button({ ...a, variant: i === 0 ? 'light' : 'outline' })).join('') +
  `</div></div>` +
  `<div class="hero-stats">${stats.map((s) => stat({ ...s, variant: 'on-image' })).join('')}</div>` +
  `</div></section>`;

export interface HeroSlide {
  image: Image;
  eyebrow: string;
  title: string;
  teaser: string;
  actions: { label: string; href: string }[];
}

export interface HeroSlidesLabels {
  // Names the slideshow for screen readers.
  label: string;
  // %1$s is the slide, %2$s the number of slides.
  slide: string;
  // A dot reads as this word and its number.
  dot: string;
  pause: string;
  play: string;
  previous: string;
  next: string;
}

export interface HeroSlidesProps {
  slides: HeroSlide[];
  stats: HeroProps['stats'];
  labels: HeroSlidesLabels;
}

// Several photos, each with its own text; the stats and controls stay. src/scripts/slider.ts moves the track, plays it
// on its own until paused, and holds it while the pointer or focus is inside; without the script the track still scrolls.
export const heroSlides = ({ slides, stats, labels }: HeroSlidesProps): string =>
  `<section${attrs({ class: 'hero hero-slides', 'data-slider': true, 'data-autoplay': '7000', 'data-label-pause': labels.pause, 'data-label-play': labels.play, 'aria-roledescription': 'carousel', 'aria-label': labels.label })}>` +
  `<div class="hero-track slider-track" tabindex="0" aria-live="off">` +
  slides
    .map((s, i) => {
      // One h1 per page: the first slide carries it, the others repeat its form.
      const tag = i === 0 ? 'h1' : 'h2';
      return (
        `<div${attrs({ class: 'hero-slide', role: 'group', 'aria-roledescription': 'slide', 'aria-label': fill(labels.slide, i + 1, slides.length) })}>` +
        `${img(s.image, 'hero-image', '100vw', i === 0)}<div class="hero-shade"></div><div class="hero-content">` +
        `<p class="hero-eyebrow type-label">${esc(s.eyebrow)}</p>` +
        `<${tag} class="hero-title type-hero">${esc(s.title)}</${tag}>` +
        `<div class="hero-teaser"><p class="type-lead">${esc(s.teaser)}</p><div class="hero-actions">` +
        s.actions.map((a, j) => button({ ...a, variant: j === 0 ? 'light' : 'outline' })).join('') +
        `</div></div></div></div>`
      );
    })
    .join('') +
  `</div>` +
  `<div class="hero-bar"><div class="hero-stats">${stats.map((s) => stat({ ...s, variant: 'on-image' })).join('')}</div>` +
  `<div class="hero-controls">` +
  `<button class="hero-pause button type-button button-outline" type="button" aria-pressed="false">${esc(labels.pause)}</button>` +
  iconButton({ direction: 'previous', label: labels.previous }) +
  sliderDots({ count: slides.length, label: labels.dot }) +
  iconButton({ direction: 'next', label: labels.next }) +
  `</div></div></section>`;
