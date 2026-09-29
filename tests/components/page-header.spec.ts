import { describe, expect, it } from 'vitest';
import { pageHeader } from '../../stories/organisms/page-header.markup';
import { expectAccessible, mount } from '../support/accessibility';

const breadcrumb = [{ label: 'Start', href: '/' }, { label: 'Hunde' }];

describe('page-header', () => {
    it('renders the h1 and chips only when given', () => {
        expect(mount(pageHeader({ title: 'Hunde', breadcrumb })).querySelector('h1')?.textContent).toBe('Hunde');
        expect(mount(pageHeader({ title: 'Hunde', breadcrumb })).querySelector('.page-header__chips')).toBeNull();
        expect(
            mount(pageHeader({ title: 'Hunde', breadcrumb, chips: [{ label: 'Hunde', href: '#', active: true }] })).querySelector(
                '.chip--active',
            ),
        ).not.toBeNull();
    });
    it('passes axe', () =>
        expectAccessible(pageHeader({ title: 'Hunde', breadcrumb, chips: [{ label: 'Hunde', href: '#', active: true }] })));
});
