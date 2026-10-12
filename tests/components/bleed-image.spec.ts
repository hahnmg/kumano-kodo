import { describe, expect, it } from 'vitest';
import { bleedImage } from '../../stories/molecules/bleed-image.markup';
import { photos } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('bleed-image', () => {
    it('links the full-size photo and shows its caption', () => {
        const el = mount(bleedImage(photos['sea-of-clouds']));
        expect(el.querySelector('a[data-lightbox]')?.getAttribute('href')).toBe(photos['sea-of-clouds'].full);
        expect(el.querySelector('figcaption')?.textContent).toBe(photos['sea-of-clouds'].caption);
        expect(el.querySelector('img')?.getAttribute('sizes')).toBe('100vw');
    });
    it('passes axe', () => expectAccessible(bleedImage(photos['sea-of-clouds'])));
});
