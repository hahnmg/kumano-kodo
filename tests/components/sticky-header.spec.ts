import { afterEach, describe, expect, it } from 'vitest';
import { syncStickyHeaders } from '../../src/scripts/sticky-header';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { kumano } from '../../stories/templates/content';

const scrollTo = (y: number) => Object.defineProperty(window, 'scrollY', { value: y, configurable: true });

describe('sticky-header', () => {
    afterEach(() => scrollTo(0));

    it('marks a sticky header as docked only once the page is scrolled', () => {
        document.body.innerHTML = siteHeader({ nav: kumano.nav });
        const header = document.querySelector<HTMLElement>('.site-header')!;
        header.style.position = 'sticky';
        syncStickyHeaders();
        expect(header.hasAttribute('data-stuck')).toBe(false);
        scrollTo(200);
        syncStickyHeaders();
        expect(header.hasAttribute('data-stuck')).toBe(true);
    });
    it('leaves headers alone that are not sticky, such as on docs pages', () => {
        document.body.innerHTML = siteHeader({ nav: kumano.nav });
        scrollTo(200);
        syncStickyHeaders();
        expect(document.querySelector('.site-header')?.hasAttribute('data-stuck')).toBe(false);
    });
});
