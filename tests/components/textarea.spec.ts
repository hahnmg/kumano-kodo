import { describe, expect, it } from 'vitest';
import { textarea } from '../../stories/atoms/textarea.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('textarea', () => {
    it('renders a textarea with rows', () => {
        expect(
            mount(textarea({ label: 'Nachricht', name: 'm', rows: 6 }))
                .querySelector('textarea')
                ?.getAttribute('rows'),
        ).toBe('6');
    });
    it('passes axe', () => expectAccessible(textarea({ label: 'Nachricht', name: 'message' })));
});
