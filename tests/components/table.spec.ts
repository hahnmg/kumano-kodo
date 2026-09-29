import { describe, expect, it } from 'vitest';
import { table } from '../../stories/molecules/table.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { caption: 'Gebühren', head: ['Tierart', 'Gebühr'], rows: [['Hund', '280 €']] };

describe('table', () => {
    it('has a caption and column headers', () => {
        const el = mount(table(props));
        expect(el.querySelector('caption')?.textContent).toBe('Gebühren');
        expect(el.querySelectorAll('th[scope="col"]')).toHaveLength(2);
    });
    it('passes axe', () => expectAccessible(table(props)));
});
