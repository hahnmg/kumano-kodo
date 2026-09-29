import { describe, expect, it } from 'vitest';
import { journalOpener } from '../../stories/organisms/journal-opener.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { kicker: 'Kumano Kodo', title: 'Four days in April', lede: 'Lede.', meta: 'April 2024', vertical: '熊野古道' };

describe('journal-opener', () => {
    it('has one h1 and hides the vertical name from screen readers', () => {
        const el = mount(journalOpener(props));
        expect(el.querySelectorAll('h1')).toHaveLength(1);
        expect(el.querySelector('.journal-opener__vertical')?.getAttribute('aria-hidden')).toBe('true');
        expect(mount(journalOpener({ ...props, vertical: undefined })).querySelector('.journal-opener__vertical')).toBeNull();
    });
    it('passes axe', () => expectAccessible(journalOpener(props)));
});
