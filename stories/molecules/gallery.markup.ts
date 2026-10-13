import { attrs, esc, img, type Image } from '../../src/lib/html';
import { hasVideo, playBadge, videoPoster, videoSource } from './video.markup';
import { lightboxGroupAttrs, type LightboxLabels } from '../../src/scripts/lightbox';

export interface GalleryProps {
    images: Image[];
    caption?: string;
    labels?: Partial<LightboxLabels>;
}

// A video opens in the lightbox like a photo; the link names it a video and carries its player.
export const lightboxLink = (image: Image, className: string, play = 'Play video'): string =>
    hasVideo(image)
        ? `<a${attrs({ class: 'lightbox-link', href: image.video.src, 'data-lightbox': true, 'aria-haspopup': 'dialog', 'aria-label': `${play}: ${image.alt}` })}>${img(image, className)}${playBadge()}${videoSource(image)}</a>`
        : `<a${attrs({ class: 'lightbox-link', href: image.full ?? image.src, 'data-lightbox': true, 'aria-haspopup': 'dialog' })}>${img(image, className)}</a>`;

// Inline elements play a video where it stands; only the gallery sends it to the lightbox.
export const photoOrVideo = (image: Image, className: string, play: string): string =>
    hasVideo(image) ? videoPoster(image, play, { image: className }) : lightboxLink(image, className);

export const gallery = ({ images, caption, labels }: GalleryProps): string =>
    `<figure${attrs({ class: 'gallery', ...lightboxGroupAttrs(labels) })}><div class="gallery-grid">${images.map((i) => lightboxLink(i, 'gallery-image', labels?.play)).join('')}</div>` +
    (caption ? `<figcaption class="gallery-caption type-caption">${esc(caption)}</figcaption>` : '') +
    `</figure>`;
