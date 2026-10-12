import { attrs, esc } from '../../src/lib/html';
import { icon } from './icon.markup';

export interface SearchFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    value?: string;
}

export const searchField = ({ label, name, placeholder, value }: SearchFieldProps): string =>
    `<label class="field">` +
    `<span class="field-label type-label">${esc(label)}</span>` +
    `<span class="field-box">${icon({ name: 'search', size: 18 })}` +
    `<input${attrs({ class: 'field-control type-small', type: 'search', name, placeholder, value })}>` +
    `</span></label>`;
