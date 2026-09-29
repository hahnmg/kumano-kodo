import { describe, expect, it } from 'vitest';
import { select } from '../../stories/atoms/select.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('select', () => {
    it('selects the given value', () => {
        const el = mount(select({ label: 'Geschlecht', name: 'sex', options: ['alle', 'männlich'], value: 'männlich' })).querySelector(
            'select',
        );
        expect((el as HTMLSelectElement).value).toBe('männlich');
    });
    it('passes axe', () => expectAccessible(select({ label: 'Geschlecht', name: 'sex', options: ['alle', 'männlich', 'weiblich'] })));
});
