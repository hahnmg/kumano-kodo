import { describe, expect, it } from 'vitest';
import { kumanoHome } from '../../stories/templates/kumano-home.markup';
import { detailPage, listPage, startPage } from '../../stories/templates/standard-pages.markup';
import { expectAccessible } from '../support/accessibility';

const templates = { kumanoHome, startPage, listPage, detailPage };

describe('templates', () => {
    for (const [name, render] of Object.entries(templates)) {
        it(`${name} has header, one main with one h1 and a footer`, () => {
            document.body.innerHTML = render();
            expect(document.querySelectorAll('header.site-header')).toHaveLength(1);
            expect(document.querySelectorAll('main')).toHaveLength(1);
            expect(document.querySelectorAll('h1')).toHaveLength(1);
            expect(document.querySelectorAll('footer.site-footer')).toHaveLength(1);
        });
        it(`${name} passes axe`, () => expectAccessible(render(), true));
    }
});
