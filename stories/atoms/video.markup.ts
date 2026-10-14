import { attrs, esc, fill, img, type Image } from '../../src/lib/html';
import { button } from './button.markup';
import { checkbox } from './checkbox.markup';
import { icon } from './icon.markup';

export type VideoImage = Image & { video: NonNullable<Image['video']> };

export const hasVideo = (image: Image): image is VideoImage => image.video !== undefined;

// The player waits here until asked for (src/scripts/video.ts); a template's content is not fetched.
export const videoSource = ({ video, alt }: VideoImage): string =>
  `<template class="video-source">` +
  (video.provider
    ? `<iframe${attrs({ src: video.src, width: video.width, height: video.height, title: alt, allow: 'fullscreen; picture-in-picture', class: 'video-player' })}></iframe>`
    : `<video controls width="${video.width}" height="${video.height}" class="video-player"><source src="${esc(video.src)}" type="${esc(video.type)}"></video>`) +
  `</template>`;

export interface VideoConsentLabels {
  // %1$s is the provider.
  text: string;
  remember: string;
  load: string;
  privacy?: { label: string; href: string };
}

// Asked before a provider's player loads, as that sends the visitor's address to the provider; a ticked box keeps
// the answer for every external video (src/scripts/video.ts).
export const videoConsent = (provider: string, labels: VideoConsentLabels): string =>
  `<template class="video-consent-source"><div class="video-consent" role="group"${attrs({ 'aria-label': labels.load })}>` +
  `<p class="video-consent-text type-small">${esc(fill(labels.text, provider))}` +
  (labels.privacy ? ` <a${attrs({ href: labels.privacy.href })}>${esc(labels.privacy.label)}</a>` : '') +
  `</p>` +
  checkbox({ label: labels.remember, name: 'video-consent-remember' }) +
  button({ label: labels.load }) +
  `</div></template>`;

export const consentFor = (image: VideoImage, labels?: VideoConsentLabels): string =>
  image.video.provider && labels ? videoConsent(image.video.provider, labels) : '';

export const playBadge = (): string => `<span class="video-badge" aria-hidden="true">${icon({ name: 'play', size: 24 })}</span>`;

// The image as poster with a play button, in the video's format; the player opens in its place. `box` passes the
// element's own class, where its layout hangs on it (Text & Media).
export const videoPoster = (
  image: VideoImage,
  play: string,
  { box = '', sizes, consent }: { box?: string; sizes?: string; consent?: VideoConsentLabels } = {},
): string =>
  `<div class="${box ? `video ${box}` : 'video'}" style="aspect-ratio: ${image.video.width} / ${image.video.height}">` +
  img(image, 'video-poster', sizes) +
  `<button class="video-play" type="button" aria-label="${esc(play)}">${icon({ name: 'play', size: 28 })}</button>` +
  videoSource(image) +
  consentFor(image, consent) +
  `</div>`;
