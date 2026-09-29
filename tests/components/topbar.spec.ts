import { describe, expect, it } from 'vitest';
import { topbar } from '../../stories/organisms/topbar.markup';
import { demo } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('topbar', () => {
    it('links phone and email', () => {
        const el = mount(topbar(demo.topbar));
        expect(el.querySelector('a[href="tel:0000000000"]')).not.toBeNull();
        expect(el.querySelector('a[href="mailto:info@example.org"]')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(topbar(demo.topbar)));
});
