import { describe, expect, it } from 'vitest';
import { badge } from '../../stories/atoms/badge.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('badge', () => {
    it('renders the label', () =>
        expect(mount(badge({ label: 'älteres Tier' })).querySelector('.badge')?.textContent).toBe('älteres Tier'));
    it('passes axe', () => expectAccessible(badge({ label: 'älteres Tier' })));
});
