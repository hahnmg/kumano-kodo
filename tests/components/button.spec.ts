import { describe, expect, it } from 'vitest';
import { button } from '../../stories/atoms/button.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('button', () => {
    it('renders a button, or a link when href is set', () => {
        expect(mount(button({ label: 'Subscribe' })).querySelector('button.button--primary')?.textContent).toBe('Subscribe');
        expect(
            mount(button({ label: 'Go', href: '/x', variant: 'light' }))
                .querySelector('a.button--light')
                ?.getAttribute('href'),
        ).toBe('/x');
    });
    it('escapes the label', () => {
        expect(mount(button({ label: '<b>x</b>' })).querySelector('b')).toBeNull();
    });
    it('passes axe in every variant', async () => {
        for (const variant of ['primary', 'light', 'outline'] as const) await expectAccessible(button({ label: 'Subscribe', variant }));
    });
});
