import { attrs } from '../../src/lib/html';
import { button } from '../atoms/button.markup';
import { searchField } from '../atoms/search-field.markup';

export interface SearchFormProps {
    action: string;
    label: string;
    submit: string;
    placeholder?: string;
    value?: string;
    // Names the search landmark; a page with a second search form needs a different one.
    landmark?: string;
}

export const searchForm = ({ action, label, submit, placeholder, value, landmark = label }: SearchFormProps): string =>
    `<form${attrs({ class: 'search-form', role: 'search', 'aria-label': landmark, action, method: 'get' })}>` +
    searchField({ label, name: 'q', placeholder, value }) +
    button({ label: submit, type: 'submit' }) +
    `</form>`;
