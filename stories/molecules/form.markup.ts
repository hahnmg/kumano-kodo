import { attrs, esc } from '../../src/lib/html';
import { button } from '../atoms/button.markup';

export interface FormProps {
    action: string;
    // Rendered fields, in order: text fields, selects, text areas, choices.
    fields: string[];
    submit: string;
    note?: string;
}

// The frame EXT:form renders its elements into: one column, the note on required fields, the button.
export const form = ({ action, fields, submit, note }: FormProps): string =>
    `<form${attrs({ class: 'form', action, method: 'post' })}>` +
    fields.join('') +
    (note ? `<p class="form-note type-caption">${esc(note)}</p>` : '') +
    `<div>${button({ label: submit, type: 'submit' })}</div>` +
    `</form>`;
