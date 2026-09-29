import { describe, expect, it } from 'vitest';
import { topbar } from '../../stories/organisms/topbar.markup';
import { guide } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('topbar', () => {
    it('links phone and email', () => {
        const el = mount(topbar(guide.topbar));
        expect(el.querySelector('a[href="tel:+810000000000"]')).not.toBeNull();
        expect(el.querySelector('a[href="mailto:post@kumano-kodo.example"]')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(topbar(guide.topbar)));
});
