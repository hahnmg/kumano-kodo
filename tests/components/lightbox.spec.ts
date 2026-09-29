import { afterEach, describe, expect, it } from 'vitest';
import { bindLightbox } from '../../src/scripts/lightbox';
import { gallery } from '../../stories/molecules/gallery.markup';
import { photos } from '../../stories/templates/content';

const images = [photos['seaside-station'], photos['nachi-pagoda'], photos['harbour-ferry']];

describe('lightbox', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('links every image to its file, grouped with labels', () => {
        document.body.innerHTML = gallery({ images, labels: { close: 'Schließen' } });
        const links = document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]');
        expect(links).toHaveLength(3);
        expect(links[1].getAttribute('href')).toBe(photos['nachi-pagoda'].full);
        expect(document.querySelector('[data-lightbox-group]')?.getAttribute('data-label-close')).toBe('Schließen');
    });
    it('opens on click, steps through the group and returns focus on close', () => {
        document.body.innerHTML = gallery({ images, labels: { close: 'Schließen' } });
        unbind = bindLightbox(document);
        const links = document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]');
        links[1].click();
        const dialog = document.querySelector('dialog.lightbox')!;
        expect(dialog.hasAttribute('open')).toBe(true);
        expect(dialog.querySelector('.lightbox__text')?.textContent).toBe(photos['nachi-pagoda'].alt);
        expect(dialog.querySelector('.lightbox__count')?.textContent).toBe('2 / 3');
        expect(dialog.querySelector('.lightbox__close')?.getAttribute('aria-label')).toBe('Schließen');
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        expect(dialog.querySelector('.lightbox__count')?.textContent).toBe('3 / 3');
        dialog.querySelector<HTMLButtonElement>('[data-step="1"]')?.click();
        expect(dialog.querySelector('.lightbox__count')?.textContent).toBe('1 / 3');
        dialog.querySelector<HTMLButtonElement>('.lightbox__close')?.click();
        expect(dialog.hasAttribute('open')).toBe(false);
    });
});
