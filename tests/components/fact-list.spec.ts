import { describe, expect, it } from 'vitest';
import { factList } from '../../stories/molecules/fact-list.markup';
import { expectAccessible, mount } from '../support/accessibility';

const facts = [{ label: 'IBAN', value: 'DE00 0000' }];

describe('fact-list', () => {
    it('uses a description list', () => {
        const el = mount(factList({ title: 'Konto', facts, layout: 'stacked' }));
        expect(el.querySelector('dl dt')?.textContent).toBe('IBAN');
        expect(el.querySelector('dl dd')?.textContent).toBe('DE00 0000');
    });
    it('passes axe', () => expectAccessible(factList({ title: 'Konto', facts })));
});
