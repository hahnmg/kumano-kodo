import { afterEach, describe, expect, it } from 'vitest';
import { bindHeroVideos } from '../../src/scripts/hero-video';
import { hero } from '../../stories/organisms/hero.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible } from '../support/accessibility';

const video = { src: '/img/video/trail.mp4', type: 'video/mp4', play: 'Play video', close: 'Close video' };

describe('hero video', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('keeps the player in a template until the play button is pressed', () => {
        document.body.innerHTML = hero({ ...kumano.hero, video });
        expect(document.querySelector('.hero-player')?.children).toHaveLength(0);
        expect(document.querySelector('template.hero-player-source')?.innerHTML).toContain('trail.mp4');
        expect(document.querySelector('video')).toBeNull();
    });
    it('plays on request and returns to the poster on close', () => {
        document.body.innerHTML = hero({ ...kumano.hero, video });
        unbind = bindHeroVideos(document);
        let played = 0;
        HTMLMediaElement.prototype.play = () => {
            played += 1;
            return Promise.resolve();
        };
        const section = document.querySelector<HTMLElement>('.hero')!;
        document.querySelector<HTMLButtonElement>('.hero-play')!.click();
        expect(section.hasAttribute('data-playing')).toBe(true);
        expect(document.querySelector('.hero-player video')).not.toBeNull();
        expect(played).toBe(1);
        document.querySelector<HTMLButtonElement>('.hero-close')!.click();
        expect(section.hasAttribute('data-playing')).toBe(false);
        expect(document.querySelector('.hero-player video')).toBeNull();
        expect(document.activeElement).toBe(document.querySelector('.hero-play'));
    });
    it('passes axe', () => expectAccessible(hero({ ...kumano.hero, video })));
});
