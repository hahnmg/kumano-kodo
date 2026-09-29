import { describe, expect, it } from 'vitest';
import { iconFact } from '../../stories/molecules/icon-fact.markup';
import { demo } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('icon-fact', () => {
    it('renders the note only when given', () => {
        expect(mount(iconFact(demo.facts[0])).querySelector('.icon-fact__note')).not.toBeNull();
        expect(mount(iconFact({ icon: 'phone', label: 'Telefon', value: '0000' })).querySelector('.icon-fact__note')).toBeNull();
    });
    it('passes axe', () => expectAccessible(iconFact(demo.facts[0])));
});
