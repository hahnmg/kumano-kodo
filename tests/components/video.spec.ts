import { afterEach, describe, expect, it } from 'vitest';
import { bindLightbox } from '../../src/scripts/lightbox';
import { bindVideos } from '../../src/scripts/video';
import { asVideo } from '../../stories/content/videos';
import { figure } from '../../stories/molecules/figure.markup';
import { gallery } from '../../stories/molecules/gallery.markup';
import { photos } from '../../stories/templates/content';
import { expectAccessible } from '../support/accessibility';

const poster = asVideo(photos['sea-of-clouds']);
const labels = { play: 'Video abspielen' };

describe('video', () => {
    const unbind: (() => void)[] = [];
    afterEach(() => unbind.splice(0).forEach((u) => u()));
    let played = 0;
    HTMLMediaElement.prototype.play = () => {
        played += 1;
        return Promise.resolve();
    };

    it('keeps the player in a template until the play button is pressed', () => {
        document.body.innerHTML = figure({ images: [poster], caption: 'Clouds', labels });
        expect(document.querySelector('video')).toBeNull();
        expect(document.querySelector('template.video-source')?.innerHTML).toContain('trail.mp4');
        expect(document.querySelector('.video-play')?.getAttribute('aria-label')).toBe('Video abspielen');
    });
    it('plays where it stands', () => {
        document.body.innerHTML = figure({ images: [poster], caption: 'Clouds', labels });
        unbind.push(bindVideos(document));
        const before = played;
        document.querySelector<HTMLButtonElement>('.video-play')!.click();
        expect(document.querySelector('.video[data-playing] .video-stage video')).not.toBeNull();
        expect(played).toBe(before + 1);
    });
    it('opens a gallery video in the lightbox and stops it on the next photo', () => {
        document.body.innerHTML = gallery({ images: [poster, photos['cedar-canopy']], labels });
        unbind.push(bindLightbox(document));
        const link = document.querySelector<HTMLAnchorElement>('a[data-lightbox]')!;
        expect(link.getAttribute('aria-label')).toContain('Video abspielen');
        link.click();
        const dialog = document.querySelector('dialog.lightbox')!;
        expect(dialog.querySelector('.lightbox-player video')).not.toBeNull();
        expect(dialog.querySelector<HTMLImageElement>('.lightbox-image')!.hidden).toBe(true);
        dialog.querySelector<HTMLButtonElement>('.lightbox-nav-next')!.click();
        expect(dialog.querySelector('.lightbox-player video')).toBeNull();
        expect(dialog.querySelector<HTMLImageElement>('.lightbox-image')!.hidden).toBe(false);
    });
    it('passes axe inline and in a gallery', async () => {
        await expectAccessible(figure({ images: [poster], caption: 'Clouds', labels }));
        await expectAccessible(gallery({ images: [poster, photos['cedar-canopy']], labels }));
    });
});
