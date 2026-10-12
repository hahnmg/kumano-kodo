import { attrs, esc } from '../../src/lib/html';
import { fieldDescription, fieldError, invalidAttrs } from './field-error.markup';

export interface TextFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'date' | 'password';
    value?: string;
    placeholder?: string;
    required?: boolean;
    autocomplete?: string;
    error?: string;
    description?: string;
    min?: number;
    max?: number;
}

export const textField = ({
    label,
    name,
    type = 'text',
    value,
    placeholder,
    required,
    autocomplete,
    error,
    description,
    min,
    max,
}: TextFieldProps): string =>
    `<label${attrs({ class: 'field' })}>` +
    `<span class="field-label type-label">${esc(label)}</span>` +
    `<span class="field-box"><input${attrs({ class: 'field-control type-lead', type, name, value, placeholder, required, autocomplete, min, max, ...invalidAttrs(name, error, description) })}></span>` +
    fieldError(name, error) +
    fieldDescription(name, description) +
    `</label>`;
