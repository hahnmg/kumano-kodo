import { esc, img, type Image } from '../../src/lib/html';

export interface StageCardProps {
    image: Image;
    stage: string;
    stats: string;
    title: string;
    description: string;
    href?: string;
}

export const stageCard = ({ image, stage, stats, title, description, href }: StageCardProps): string =>
    `<article class="stage-card">${img(image, 'stage-card__image', '(width <= 600px) 80vw, 420px')}` +
    `<div class="stage-card__meta"><p class="stage-card__stage type-label">${esc(stage)}</p><p class="stage-card__stats type-caption">${esc(stats)}</p></div>` +
    `<h3 class="stage-card__title type-h4">${href ? `<a href="${esc(href)}">${esc(title)}</a>` : esc(title)}</h3>` +
    `<p class="stage-card__description type-small">${esc(description)}</p></article>`;
