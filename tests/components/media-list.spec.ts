import { describe, expect, it } from 'vitest';
import { mediaList } from '../../stories/molecules/media-list.markup';
import { demo } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

const props = { title: 'Tiere nach Art', items: demo.categories, more: { label: 'Alle Tiere ansehen', href: '#' } };

describe('media-list', () => {
    it('renders one link row per item', () => {
        expect(mount(mediaList(props)).querySelectorAll('.media-list__row')).toHaveLength(3);
    });
    it('passes axe', () => expectAccessible(mediaList(props)));
});
