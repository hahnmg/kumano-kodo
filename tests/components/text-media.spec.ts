import { describe, expect, it } from 'vitest';
import { textMedia } from '../../stories/molecules/text-media.markup';
import { photos } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

const props = { image: photos['forest-stream'], title: 'Jugendgruppe', text: 'Jeden Samstag.', link: { label: 'Mehr', href: '#' } };

describe('text-media', () => {
    it('sets the image side as a modifier', () => {
        expect(mount(textMedia({ ...props, imageSide: 'right' })).querySelector('.text-media-image-right')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(textMedia(props)));
});
