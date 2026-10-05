import { attrs, cx, esc } from '../../src/lib/html';
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
    `<label${attrs({ class: cx('field', error && 'field--invalid') })}>` +
    `<span class="field__label type-label">${esc(label)}</span>` +
    `<span class="field__box"><input${attrs({ class: 'field__control type-lead', type, name, value, placeholder, required, autocomplete, ...invalidAttrs(name, error) })}></span>` +
    fieldError(name, error) +
    `</label>`;
