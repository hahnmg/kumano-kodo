import { describe, expect, it } from 'vitest';
import { breadcrumb } from '../../stories/molecules/breadcrumb.markup';
import { expectAccessible, mount } from '../support/accessibility';

const items = [{ label: 'Start', href: '/' }, { label: 'Stages' }];

describe('breadcrumb', () => {
    it('links all but the current item', () => {
        const el = mount(breadcrumb({ items }));
        expect(el.querySelectorAll('a')).toHaveLength(1);
        expect(el.querySelector('[aria-current="page"]')?.textContent).toBe('Stages');
    });
    it('passes axe', () => expectAccessible(breadcrumb({ items })));
});
