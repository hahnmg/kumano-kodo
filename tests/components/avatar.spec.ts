import { describe, expect, it } from 'vitest';
import { avatar } from '../../stories/atoms/avatar.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('avatar', () => {
    it('sets intrinsic size per variant', () => {
        expect(
            mount(avatar({ src: 'a.jpg', alt: 'A' }))
                .querySelector('img')
                ?.getAttribute('width'),
        ).toBe('136');
        expect(
            mount(avatar({ src: 'a.jpg', alt: 'A', size: 'small' }))
                .querySelector('img')
                ?.getAttribute('width'),
        ).toBe('56');
    });
    it('passes axe', () => expectAccessible(avatar({ src: 'a.jpg', alt: 'Dennis Kral' })));
});
