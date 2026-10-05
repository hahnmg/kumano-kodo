import { attrs, esc } from '../../src/lib/html';
import { iconCircle } from '../atoms/icon-circle.markup';

export interface SearchResult {
    title: string;
    href: string;
    path: string;
    // Trusted markup: the excerpt with the matched words in <mark>.
    excerpt: string;
}

export interface SearchResultsProps {
    label: string;
    summary: string;
    items: SearchResult[];
    pagination?: string;
}

// Rows as in the media list, without a picture and with the passage that matched.
export const searchResults = ({ label, summary, items, pagination = '' }: SearchResultsProps): string =>
    `<section${attrs({ class: 'search-results', 'aria-label': label })}><p class="search-results__summary type-small">${esc(summary)}</p>` +
    (items.length
        ? `<ol class="search-results__items">` +
          items
              .map(
                  (i) =>
                      `<li><a${attrs({ class: 'media-list__row search-results__row', href: i.href })}>` +
                      `<span class="media-list__text search-results__text"><span class="type-h4">${esc(i.title)}</span>` +
                      `<span class="media-list__meta type-caption">${esc(i.path)}</span>` +
                      `<span class="search-results__excerpt type-small">${i.excerpt}</span></span>` +
                      `${iconCircle({ name: 'arrow-right' })}</a></li>`,
              )
              .join('') +
          `</ol>`
        : '') +
    pagination +
    `</section>`;
