import { describe, expect, it } from 'vitest';
import { iconCircle } from '../../stories/atoms/icon-circle.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('icon-circle', () => {
    it('wraps a decorative icon', () => {
        expect(mount(iconCircle({ name: 'phone' })).querySelector('.icon-circle svg[aria-hidden="true"]')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(iconCircle({ name: 'phone' })));
});
