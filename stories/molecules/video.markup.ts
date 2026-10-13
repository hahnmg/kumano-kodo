import { esc, img, type Image } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';

type VideoImage = Image & { video: NonNullable<Image['video']> };

export const hasVideo = (image: Image): image is VideoImage => image.video !== undefined;

// The player waits here until asked for (src/scripts/video.ts); a template's content is not fetched.
export const videoSource = ({ video }: VideoImage): string =>
    `<template class="video-source"><video controls class="video-player"><source src="${esc(video.src)}" type="${esc(video.type)}"></video></template>`;

export const playBadge = (): string => `<span class="video-badge" aria-hidden="true">${icon({ name: 'play', size: 24 })}</span>`;

// The image as poster with a play button; the player opens in its place and size. Where the layout hangs on the
// image's class, the box takes it (`box`) and the poster fills the box.
export const videoPoster = (
    image: VideoImage,
    play: string,
    { image: cls = '', box = '', sizes }: { image?: string; box?: string; sizes?: string } = {},
): string =>
    `<div class="${box ? `video ${box}` : 'video'}">${img(image, box ? 'video-poster video-poster-fill' : `${cls} video-poster`, sizes)}` +
    `<button class="video-play" type="button" aria-label="${esc(play)}">${icon({ name: 'play', size: 28 })}</button>` +
    videoSource(image) +
    `</div>`;
