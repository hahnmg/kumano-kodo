import { attrs, esc } from '../../src/lib/html';

export interface TextareaProps {
    label: string;
    name: string;
    placeholder?: string;
    rows?: number;
}

export const textarea = ({ label, name, placeholder, rows = 4 }: TextareaProps): string =>
    `<label class="field">` +
    `<span class="field__label type-label">${esc(label)}</span>` +
    `<textarea${attrs({ class: 'field__control field__control--textarea type-small', name, placeholder, rows })}></textarea>` +
    `</label>`;
