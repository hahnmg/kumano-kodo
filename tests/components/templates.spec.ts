import { describe, expect, it } from 'vitest';
import { content, locales, type Locale } from '../../stories/templates/content';
import { kumanoHome } from '../../stories/templates/kumano-home.markup';
import { detailPage, listPage, startPage } from '../../stories/templates/standard-pages.markup';
import { expectAccessible } from '../support/accessibility';

const templates = { kumanoHome, startPage, listPage, detailPage };

describe('templates', () => {
    for (const locale of Object.keys(locales) as Locale[]) {
        for (const [name, render] of Object.entries(templates)) {
            const html = () => render(content(locale));
            it(`${name} (${locale}) has header, one main with one h1 and a footer`, () => {
                document.body.innerHTML = html();
                expect(document.querySelectorAll('header.site-header')).toHaveLength(1);
                expect(document.querySelectorAll('main')).toHaveLength(1);
                expect(document.querySelectorAll('h1')).toHaveLength(1);
                expect(document.querySelectorAll('footer.site-footer')).toHaveLength(1);
                expect(document.querySelector('.site-header__languages [aria-current="true"]')?.getAttribute('data-locale')).toBe(locale);
            });
            it(`${name} (${locale}) passes axe`, () => expectAccessible(html(), true));
        }
    }
    it('detail page figure has no top rule', () => {
        document.body.innerHTML = detailPage();
        expect(document.querySelector('.figure')?.classList.contains('figure--unruled')).toBe(true);
    });
});
