import { attrs, esc } from '../../src/lib/html';
import { icon } from './icon.markup';

export interface SearchFieldProps {
    label: string;
    name: string;
    placeholder?: string;
}

export const searchField = ({ label, name, placeholder }: SearchFieldProps): string =>
    `<label class="field">` +
    `<span class="field__label type-label">${esc(label)}</span>` +
    `<span class="field__box">${icon({ name: 'search', size: 18 })}` +
    `<input${attrs({ class: 'field__control type-small', type: 'search', name, placeholder })}>` +
    `</span></label>`;
