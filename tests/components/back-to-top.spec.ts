import { afterEach, describe, expect, it } from 'vitest';
import { bindBackToTop, syncBackToTop } from '../../src/scripts/back-to-top';
import { backToTop } from '../../stories/atoms/back-to-top.markup';
import { expectAccessible } from '../support/accessibility';

describe('back-to-top', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('is a named button, hidden until the page is scrolled past one screen', async () => {
        document.body.innerHTML = `<a href="#">Start</a>${backToTop({ label: 'Nach oben' })}`;
        const button = document.querySelector<HTMLButtonElement>('.back-to-top')!;
        expect(button.getAttribute('aria-label')).toBe('Nach oben');
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
        syncBackToTop(window);
        expect(button.hasAttribute('data-visible')).toBe(false);
        Object.defineProperty(window, 'scrollY', { value: window.innerHeight + 1, configurable: true });
        syncBackToTop(window);
        expect(button.hasAttribute('data-visible')).toBe(true);
        await expectAccessible(backToTop({ label: 'Nach oben', visible: true }));
    });
    it('scrolls to the top and moves focus to the start of the page', () => {
        document.body.innerHTML = `<a href="#">Start</a>${backToTop({ visible: true })}`;
        unbind = bindBackToTop(window);
        const calls: ScrollToOptions[] = [];
        window.scrollTo = ((o: ScrollToOptions) => calls.push(o)) as typeof window.scrollTo;
        document.querySelector<HTMLButtonElement>('.back-to-top')!.click();
        expect(calls[0]?.top).toBe(0);
        expect(document.activeElement).toBe(document.querySelector('a'));
    });
});
