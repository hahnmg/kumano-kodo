import { esc, img, type Image } from '../../src/lib/html';

export interface StageCardProps {
  image: Image;
  stage: string;
  stats: string;
  title: string;
  description: string;
  href?: string;
}

export const portraitCard = ({ image, stage, stats, title, description, href }: StageCardProps): string =>
  `<article class="portrait-card">${img(image, 'portrait-card-image', '(width <= 600px) 80vw, 420px')}` +
  `<div class="portrait-card-meta"><p class="portrait-card-label type-label">${esc(stage)}</p><p class="portrait-card-stats type-caption">${esc(stats)}</p></div>` +
  `<h3 class="portrait-card-title type-h4">${href ? `<a href="${esc(href)}">${esc(title)}</a>` : esc(title)}</h3>` +
  `<p class="portrait-card-text type-small">${esc(description)}</p></article>`;
