import { describe, expect, it } from 'vitest';
import { legalSlugs, placeSlugs, practicalSlugs, storyFor } from '../../stories/content/paths';
import { content, locales, type Content, type Locale } from '../../stories/templates/content';
import { kumanoHome } from '../../stories/templates/kumano-home.markup';
import {
    dayPage,
    daysPage,
    homePage,
    kohechiPage,
    legalPage,
    newsletterPage,
    photosPage,
    placePage,
    practicalPage,
    practicalSubPage,
    routePage,
    searchPage,
    loginPage,
    contactPage,
    notFoundPage,
    papersPage,
} from '../../stories/templates/site-pages.markup';
import { expectAccessible } from '../support/accessibility';

// Files the pages may link to, as Storybook serves them under /files/.
const files = new Set(Object.keys(import.meta.glob('../../files/**/*')).map((path) => path.replace('../../files/', '/files/')));

const pages: Record<string, (c: Content) => string> = {
    home: homePage,
    route: routePage,
    days: daysPage,
    ...Object.fromEntries([1, 2, 3, 4].map((n) => [`day ${n}`, (c: Content) => dayPage(n, c)])),
    ...Object.fromEntries(placeSlugs.map((s) => [`place ${s}`, (c: Content) => placePage(s, c)])),
    practical: practicalPage,
    ...Object.fromEntries(practicalSlugs.map((s) => [`practical ${s}`, (c: Content) => practicalSubPage(s, c)])),
    photos: photosPage,
    newsletter: newsletterPage,
    kohechi: kohechiPage,
    ...Object.fromEntries(legalSlugs.map((s) => [s, (c: Content) => legalPage(s, c)])),
    'home v3': kumanoHome,
    search: searchPage,
    login: loginPage,
    contact: contactPage,
    'not found': notFoundPage,
    papers: papersPage,
};

describe('site pages', () => {
    for (const locale of Object.keys(locales) as Locale[]) {
        for (const [name, render] of Object.entries(pages)) {
            const html = () => render(content(locale));
            it(`${name} (${locale}) has header, one main with one h1 and a footer`, () => {
                document.body.innerHTML = html();
                expect(document.querySelectorAll('header.site-header')).toHaveLength(1);
                expect(document.querySelectorAll('main')).toHaveLength(1);
                expect(document.querySelectorAll('h1')).toHaveLength(1);
                expect(document.querySelectorAll('footer.site-footer')).toHaveLength(1);
            });
            it(`${name} (${locale}) only links to pages, anchors and files that exist`, () => {
                document.body.innerHTML = html();
                const broken = [...document.querySelectorAll('a[href]')]
                    .map((a) => a.getAttribute('href') ?? '')
                    .filter((href) =>
                        href.startsWith('/files/')
                            ? !files.has(href)
                            : href.startsWith('/')
                              ? !storyFor(href)
                              : href.startsWith('#') && href.length > 1 && !document.getElementById(href.slice(1)),
                    );
                expect(broken).toEqual([]);
            });
            it(`${name} (${locale}) passes axe`, () => expectAccessible(html(), true));
        }
    }
});
