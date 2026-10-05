import type { Meta, StoryObj } from '@storybook/html-vite';
import { fill } from '../../src/lib/html';
import { content } from '../templates/content';
import { searchSample } from '../templates/search-sample';
import { searchResults } from './search-results.markup';

const meta: Meta = { title: 'Molecules/Search Results' };
export default meta;

const query: Record<string, string> = { en: 'bus', de: 'Bus', ja: 'バス' };

export const SearchResults: StoryObj = {
    render: (_, { globals }) => {
        const c = content(globals.locale);
        const items = searchSample(c, query[c.locale]);
        return searchResults({ label: c.ui.searchResults, summary: fill(c.ui.searchSummary, items.length, query[c.locale]), items });
    },
};

export const NothingFound: StoryObj = {
    render: (_, { globals }) => {
        const c = content(globals.locale);
        return searchResults({ label: c.ui.searchResults, summary: fill(c.ui.searchEmpty, 'Kumano Kaido'), items: [] });
    },
};
