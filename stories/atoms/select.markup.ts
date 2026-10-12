import { attrs, esc } from '../../src/lib/html';
import { fieldError, invalidAttrs } from './field-error.markup';
import { icon } from './icon.markup';

export interface SelectProps {
    label: string;
    name: string;
    options: string[];
    value?: string;
    required?: boolean;
    error?: string;
}

export const select = ({ label, name, options, value, required, error }: SelectProps): string =>
    `<label${attrs({ class: 'field' })}>` +
    `<span class="field-label type-label">${esc(label)}</span>` +
    `<span class="field-box">` +
    `<select${attrs({ class: 'field-control field-control-select type-small', name, required, ...invalidAttrs(name, error) })}>` +
    options.map((o) => `<option${attrs({ selected: o === value })}>${esc(o)}</option>`).join('') +
    `</select>${icon({ name: 'chevron-down', size: 18 })}</span>` +
    fieldError(name, error) +
    `</label>`;
