import { esc, img, type Image } from '../../src/lib/html';
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
