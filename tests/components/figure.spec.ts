import { describe, expect, it } from 'vitest';
import { figure } from '../../stories/molecules/figure.markup';
import { photos } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('figure', () => {
    it('switches to the pair variant with two images', () => {
        expect(
            mount(figure({ images: [photos.krabbe, photos.nebelbaum], caption: 'c' })).querySelector('.figure--pair img + img'),
        ).not.toBeNull();
        expect(mount(figure({ images: [photos.steinbruecke], caption: 'c' })).querySelector('.figure--default')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(figure({ images: [photos.steinbruecke], caption: 'Kilometre 14.' })));
});
