import { attrs, esc } from '../../src/lib/html';

export interface TextFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'tel';
    value?: string;
    placeholder?: string;
    required?: boolean;
}

export const textField = ({ label, name, type = 'text', value, placeholder, required }: TextFieldProps): string =>
    `<label class="field">` +
    `<span class="field__label type-label">${esc(label)}</span>` +
    `<input${attrs({ class: 'field__control type-lead', type, name, value, placeholder, required })}>` +
    `</label>`;
