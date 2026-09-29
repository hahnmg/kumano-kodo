import { describe, expect, it } from 'vitest';
import { notice } from '../../stories/molecules/notice.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('notice', () => {
    it('is a note with title and text', () => {
        const el = mount(notice({ title: 'Notfälle:', text: 'Polizei.' }));
        expect(el.querySelector('[role="note"] strong')?.textContent).toBe('Notfälle:');
    });
    it('passes axe', () => expectAccessible(notice({ title: 'Notfälle:', text: 'Polizei.' })));
});
