import { describe, expect, it } from 'vitest';
import { pageHeader } from '../../stories/organisms/page-header.markup';
import { expectAccessible, mount } from '../support/accessibility';

const breadcrumb = [{ label: 'Start', href: '/' }, { label: 'Stages' }];

describe('page-header', () => {
    it('renders the h1 and chips only when given', () => {
        expect(mount(pageHeader({ title: 'Stages', breadcrumb })).querySelector('h1')?.textContent).toBe('Stages');
        expect(mount(pageHeader({ title: 'Stages', breadcrumb })).querySelector('.page-header__chips')).toBeNull();
        expect(
            mount(pageHeader({ title: 'Stages', breadcrumb, chips: [{ label: 'Stages', href: '#', active: true }] })).querySelector(
                '.chip--active',
            ),
        ).not.toBeNull();
    });
    it('passes axe', () =>
        expectAccessible(pageHeader({ title: 'Stages', breadcrumb, chips: [{ label: 'Stages', href: '#', active: true }] })));
});
