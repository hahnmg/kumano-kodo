import { attrs, esc } from '../../src/lib/html';
import { fieldError, invalidAttrs } from './field-error.markup';

export interface TextFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'tel' | 'password';
    value?: string;
    placeholder?: string;
    required?: boolean;
    autocomplete?: string;
    error?: string;
}

export const textField = ({ label, name, type = 'text', value, placeholder, required, autocomplete, error }: TextFieldProps): string =>
    `<label${attrs({ class: 'field' })}>` +
    `<span class="field-label type-label">${esc(label)}</span>` +
    `<span class="field-box"><input${attrs({ class: 'field-control type-lead', type, name, value, placeholder, required, autocomplete, ...invalidAttrs(name, error) })}></span>` +
    fieldError(name, error) +
    `</label>`;
