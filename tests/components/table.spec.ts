import { describe, expect, it } from 'vitest';
import { table } from '../../stories/molecules/table.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { caption: 'Stages', head: ['Stage', 'Distance'], rows: [['Chikatsuyu → Hongu', '25,9 km']] };

describe('table', () => {
    it('has a caption and column headers', () => {
        const el = mount(table(props));
        expect(el.querySelector('caption')?.textContent).toBe('Stages');
        expect(el.querySelectorAll('th[scope="col"]')).toHaveLength(2);
    });
    it('passes axe', () => expectAccessible(table(props)));
});
