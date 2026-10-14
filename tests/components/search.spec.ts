import { describe, expect, it } from 'vitest';
import { searchForm } from '../../stories/molecules/search-form.markup';
import { searchResults } from '../../stories/molecules/search-results.markup';
import { siteHeader } from '../../stories/organisms/site-header.markup';
import { content } from '../../stories/templates/content';
import { searchSample } from '../../stories/templates/search-sample';
import { expectAccessible, mount } from '../support/accessibility';

const form = { action: '/search', label: 'Search', submit: 'Search', placeholder: 'Search days, places and tips' };

describe('search', () => {
  it('sends the query as q with GET', () => {
    const el = mount(searchForm({ ...form, value: 'bus' })).querySelector('form[role="search"]');
    expect(el?.getAttribute('method')).toBe('get');
    expect(el?.querySelector<HTMLInputElement>('input[type="search"]')?.name).toBe('q');
    expect(el?.querySelector<HTMLInputElement>('input')?.value).toBe('bus');
  });
  it('finds the journal passages that name the query, with the match marked', () => {
    const items = searchSample(content('en'), 'bus');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => /<mark>bus<\/mark>/i.test(i.excerpt))).toBe(true);
  });
  it('lists results as links with path and excerpt', () => {
    const items = searchSample(content('en'), 'bus');
    const el = mount(searchResults({ label: 'Search results', summary: `${items.length} results`, items }));
    expect(el.querySelectorAll('.search-results-items a')).toHaveLength(items.length);
    expect(el.querySelector('mark')).not.toBeNull();
  });
  it('opens the header search as a disclosure', () => {
    const toggle = mount(siteHeader({ nav: [], search: form })).querySelector('.site-header-search-toggle');
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(toggle?.getAttribute('aria-label')).toBe('Search');
  });
  it('passes axe', () =>
    expectAccessible(
      searchForm(form) + searchResults({ label: 'Search results', summary: '3 results', items: searchSample(content('en'), 'bus') }),
    ));
});
