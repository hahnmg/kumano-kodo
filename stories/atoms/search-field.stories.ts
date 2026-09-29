import type { Meta, StoryObj } from '@storybook/html-vite';
import { searchField, type SearchFieldProps } from './search-field.markup';
import './icon.css';
import './text-field.css';

const meta: Meta<SearchFieldProps> = {
    title: 'Atoms/Search Field',
    render: (args) => `<div style="max-width:450px">${searchField(args)}</div>`,
    args: { label: 'Search stages and places', name: 'q', placeholder: 'e.g. Hongu' },
};
export default meta;

export const SearchField: StoryObj<SearchFieldProps> = {};
