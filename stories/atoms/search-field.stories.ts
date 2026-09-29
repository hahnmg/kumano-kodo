import type { Meta, StoryObj } from '@storybook/html-vite';
import { searchField, type SearchFieldProps } from './search-field.markup';
import './icon.css';
import './text-field.css';

const meta: Meta<SearchFieldProps> = {
    title: 'Atoms/Search Field',
    render: (args) => `<div style="max-width:450px">${searchField(args)}</div>`,
    args: { label: 'Nach Namen oder Rasse suchen', name: 'q', placeholder: 'z. B. Mischling' },
};
export default meta;

export const Playground: StoryObj<SearchFieldProps> = {};
