import { describe, expect, it } from 'vitest';
import { gallery } from '../../stories/molecules/gallery.markup';
import { photos } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

const images = [photos.zedernweg, photos.nachi, photos.onsen];

describe('gallery', () => {
    it('renders every image and an optional caption', () => {
        expect(mount(gallery({ images })).querySelectorAll('img')).toHaveLength(3);
        expect(mount(gallery({ images })).querySelector('figcaption')).toBeNull();
    });
    it('passes axe', () => expectAccessible(gallery({ images, caption: 'Four days on the Nakahechi' })));
});
