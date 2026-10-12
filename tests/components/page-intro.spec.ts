import { describe, expect, it } from 'vitest';
import { pageIntro } from '../../stories/organisms/page-intro.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { kicker: 'Kumano Kodo', title: 'Four days in April', lede: 'Lede.', meta: 'April 2024', vertical: '熊野古道' };

describe('page-intro', () => {
    it('has one h1 and hides the vertical name from screen readers', () => {
        const el = mount(pageIntro(props));
        expect(el.querySelectorAll('h1')).toHaveLength(1);
        expect(el.querySelector('.page-intro-upright')?.getAttribute('aria-hidden')).toBe('true');
        expect(mount(pageIntro({ ...props, vertical: undefined })).querySelector('.page-intro-upright')).toBeNull();
    });
    it('passes axe', () => expectAccessible(pageIntro(props)));
});
