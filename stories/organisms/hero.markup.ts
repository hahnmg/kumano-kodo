import { esc, img, type Image } from '../../src/lib/html';
import { button } from '../atoms/button.markup';
import { icon } from '../atoms/icon.markup';
import { stat } from '../molecules/stat.markup';

export interface HeroProps {
    image: Image;
    eyebrow: string;
    title: string;
    teaser: string;
    actions: { label: string; href: string }[];
    stats: { label: string; value: string }[];
    video?: { src: string; type: string; play: string; close: string };
}

const heading = (title: string) => `<h1 class="hero-title type-hero">${esc(title)}</h1>`;

// The player waits in a template until the play button asks for it (src/scripts/hero-video.ts).
const player = (video: NonNullable<HeroProps['video']>) =>
    `<div class="hero-player"></div>` +
    `<template class="hero-player-source"><video controls class="hero-video"><source src="${esc(video.src)}" type="${esc(video.type)}"></video></template>` +
    `<button class="hero-close" type="button" aria-label="${esc(video.close)}">${icon({ name: 'close' })}</button>`;

export const hero = ({ image, eyebrow, title, teaser, actions, stats, video }: HeroProps): string =>
    `<section class="hero"${video ? ' data-video' : ''}>${img(image, 'hero-image', '100vw', true)}<div class="hero-shade"></div>` +
    (video ? player(video) : '') +
    `<div class="hero-content">` +
    `<p class="hero-eyebrow type-label">${esc(eyebrow)}</p>` +
    (video
        ? `<div class="hero-head">${heading(title)}<button class="hero-play" type="button" aria-label="${esc(video.play)}">${icon({ name: 'play', size: 28 })}</button></div>`
        : heading(title)) +
    `<div class="hero-teaser"><p class="type-lead">${esc(teaser)}</p><div class="hero-actions">` +
    actions.map((a, i) => button({ ...a, variant: i === 0 ? 'light' : 'outline' })).join('') +
    `</div></div>` +
    `<div class="hero-stats">${stats.map((s) => stat({ ...s, variant: 'on-image' })).join('')}</div>` +
    `</div></section>`;
