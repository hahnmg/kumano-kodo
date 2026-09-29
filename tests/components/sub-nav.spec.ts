import { describe, expect, it } from 'vitest';
import { subNav } from '../../stories/molecules/sub-nav.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
    title: 'Über uns',
    items: [
        { label: 'Team', href: '/team', active: true },
        { label: 'Kontakt', href: '/kontakt' },
    ],
};

describe('sub-nav', () => {
    it('labels the nav and marks the current page', () => {
        const el = mount(subNav(props));
        expect(el.querySelector('nav')?.getAttribute('aria-label')).toBe('Über uns');
        expect(el.querySelector('[aria-current="page"]')?.textContent).toBe('Team');
    });
    it('passes axe', () => expectAccessible(subNav(props)));
});
