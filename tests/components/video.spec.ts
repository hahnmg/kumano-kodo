import { afterEach, describe, expect, it } from 'vitest';
import { bindLightbox } from '../../src/scripts/lightbox';
import { bindMediaConsent, bindVideos, externalAllowed } from '../../src/scripts/video';
import { videoPoster } from '../../stories/atoms/video.markup';
import { asExternalVideo, asVideo } from '../../stories/content/videos';
import { mediaConsent } from '../../stories/molecules/media-consent.markup';
import { figure } from '../../stories/molecules/figure.markup';
import { gallery } from '../../stories/molecules/gallery.markup';
import { photos } from '../../stories/templates/content';
import { expectAccessible } from '../support/accessibility';

const poster = asVideo(photos['sea-of-clouds']);
const labels = { play: 'Video abspielen' };
const external = asExternalVideo(photos['sea-of-clouds']);
const consent = {
  text: 'Lädt von %1$s.',
  remember: 'Immer laden',
  load: 'Video laden',
  privacy: { label: 'Datenschutz', href: '/privacy' },
};

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
  describe('from a provider', () => {
    afterEach(() => localStorage.clear());
    const ask = (): HTMLElement => {
      document.body.innerHTML = videoPoster(external, 'Video abspielen', { consent });
      unbind.push(bindVideos(document));
      document.querySelector<HTMLButtonElement>('.video-play')!.click();
      return document.querySelector<HTMLElement>('.video > .video-consent')!;
    };

    it('asks before the player loads, naming the provider', () => {
      const panel = ask();
      expect(panel.textContent).toContain('Lädt von YouTube.');
      expect(document.querySelector('iframe')).toBeNull();
      expect(document.activeElement?.textContent).toBe('Video laden');
    });
    it('loads on the yes and remembers it only when asked to', () => {
      ask().querySelector<HTMLButtonElement>('.button')!.click();
      expect(document.querySelector('.video-stage iframe')?.getAttribute('src')).toContain('youtube-nocookie.com');
      expect(externalAllowed()).toBe(false);
      const panel = ask();
      panel.querySelector<HTMLInputElement>('.choice-input')!.checked = true;
      panel.querySelector<HTMLButtonElement>('.button')!.click();
      expect(externalAllowed()).toBe(true);
      ask();
      expect(document.querySelector('.video > .video-consent')).toBeNull();
      expect(document.querySelector('.video-stage iframe')).not.toBeNull();
    });
    it('asks in the lightbox too', () => {
      document.body.innerHTML = gallery({ images: [external], labels, consent });
      unbind.push(bindLightbox(document));
      document.querySelector<HTMLAnchorElement>('a[data-lightbox]')!.click();
      const player = document.querySelector('dialog.lightbox .lightbox-player')!;
      expect(player.querySelector('iframe')).toBeNull();
      player.querySelector<HTMLButtonElement>('.video-consent .button')!.click();
      expect(player.querySelector('iframe')).not.toBeNull();
    });
    it('shows and changes the stored answer on the privacy page', () => {
      localStorage.setItem('kumano-kodo.external-media', 'allow');
      document.body.innerHTML = mediaConsent({ text: 'Videos', toggle: 'Automatisch laden' });
      unbind.push(bindMediaConsent(document));
      const box = document.querySelector<HTMLInputElement>('.media-consent .choice-input')!;
      expect(box.checked).toBe(true);
      box.checked = false;
      box.dispatchEvent(new Event('change', { bubbles: true }));
      expect(externalAllowed()).toBe(false);
    });
    it('passes axe while asking', async () => {
      await expectAccessible(ask().outerHTML);
      await expectAccessible(mediaConsent({ text: 'Videos', toggle: 'Automatisch laden' }));
    });
  });
  it('passes axe inline and in a gallery', async () => {
    await expectAccessible(figure({ images: [poster], caption: 'Clouds', labels }));
    await expectAccessible(gallery({ images: [poster, photos['cedar-canopy']], labels }));
  });
});
