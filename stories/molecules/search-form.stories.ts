import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { searchForm, type SearchFormProps } from './search-form.markup';

const meta: Meta<SearchFormProps> = {
  title: 'Molecules/Search Form',
  render: localized(searchForm, (c) => ({ action: '#', label: c.ui.search, submit: c.ui.search, placeholder: c.ui.searchPlaceholder })),
};
export default meta;

export const SearchForm: StoryObj<SearchFormProps> = {};
