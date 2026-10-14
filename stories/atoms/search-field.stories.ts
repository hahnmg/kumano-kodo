import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { searchField, type SearchFieldProps } from './search-field.markup';

const meta: Meta<SearchFieldProps> = {
  title: 'Atoms/Search Field',
  parameters: { usage: 'type="search"' },
  render: localized(
    (p: SearchFieldProps) => `<div style="max-width:450px">${searchField(p)}</div>`,
    (c) => c.pages.list.search,
  ),
  args: { name: 'q' },
};
export default meta;

export const SearchField: StoryObj<SearchFieldProps> = {};
