import { attrs, esc, fill, img, type Image } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';
import { iconButton } from '../atoms/icon-button.markup';
import { sliderDots } from '../atoms/slider-dots.markup';
import { button } from '../atoms/button.markup';
import { stat } from '../molecules/stat.markup';

// The editor's line breaks, as TYPO3's f:render.text gives them.
const lines = (text: string): string => esc(text).replace(/\n/g, '<br>\n');

export interface HeroProps {
  image: Image;
  eyebrow: string;
  title: string;
  teaser: string;
  actions: { label: string; href: string }[];
  stats: { label: string; value: string }[];
  // 2 where something above already carries the page's h1.
  level?: 1 | 2;
}

export const hero = ({ image, eyebrow, title, teaser, actions, stats, level = 1 }: HeroProps): string =>
  `<section class="hero">${img(image, 'hero-image', '100vw', true)}<div class="hero-shade"></div><div class="hero-content">` +
  `<p class="hero-eyebrow type-label">${esc(eyebrow)}</p>` +
  `<h${level} class="hero-title type-hero">${lines(title)}</h${level}>` +
  `<div class="hero-teaser"><div class="type-lead"><p>${esc(teaser)}</p></div><div class="hero-actions">` +
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
  level?: HeroProps['level'];
}

// Several photos, each with its own text; the stats and controls stay. src/scripts/slider.ts moves the track, plays it
// on its own until paused, and holds it while the pointer or focus is inside; without the script the track still scrolls.
export const heroSlides = ({ slides, stats, labels, level = 1 }: HeroSlidesProps): string =>
  `<section${attrs({ class: 'hero hero-slides', 'data-slider': true, 'data-autoplay': '7000', 'data-label-pause': labels.pause, 'data-label-play': labels.play, 'aria-roledescription': 'carousel', 'aria-label': labels.label })}>` +
  `<div class="hero-track slider-track" tabindex="0" aria-live="off">` +
  slides
    .map((s, i) => {
      // One h1 per page: the first slide carries it, the others repeat its form.
      const tag = i === 0 ? `h${level}` : 'h2';
      return (
        `<div${attrs({ class: 'hero-slide', role: 'group', 'aria-roledescription': 'slide', 'aria-label': fill(labels.slide, i + 1, slides.length) })}>` +
        `${img(s.image, 'hero-image', '100vw', i === 0)}<div class="hero-shade"></div><div class="hero-content">` +
        `<p class="hero-eyebrow type-label">${esc(s.eyebrow)}</p>` +
        `<${tag} class="hero-title type-hero">${lines(s.title)}</${tag}>` +
        `<div class="hero-teaser"><div class="type-lead"><p>${esc(s.teaser)}</p></div><div class="hero-actions">` +
        s.actions.map((a, j) => button({ ...a, variant: j === 0 ? 'light' : 'outline' })).join('') +
        `</div></div></div></div>`
      );
    })
    .join('') +
  `</div>` +
  // The arrows sit on the photo's edges; dots and pause stay centred at the foot.
  `<div class="hero-arrows">${iconButton({ direction: 'previous', label: labels.previous })}${iconButton({ direction: 'next', label: labels.next })}</div>` +
  `<div class="hero-bar"><div class="hero-stats">${stats.map((s) => stat({ ...s, variant: 'on-image' })).join('')}</div>` +
  `<div class="hero-controls">` +
  sliderDots({ count: slides.length, label: labels.dot }) +
  `<button${attrs({ class: 'hero-pause icon-button', type: 'button', 'aria-pressed': 'false', 'aria-label': labels.pause })}>${icon({ name: 'pause', size: 20 })}${icon({ name: 'play', size: 20 })}</button>` +
  `</div></div></section>`;
