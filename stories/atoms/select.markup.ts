import { attrs, cx, esc } from '../../src/lib/html';
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
    `<label${attrs({ class: cx('field', error && 'field--invalid') })}>` +
    `<span class="field__label type-label">${esc(label)}</span>` +
    `<span class="field__box">` +
    `<select${attrs({ class: 'field__control field__control--select type-small', name, required, ...invalidAttrs(name, error) })}>` +
    options.map((o) => `<option${attrs({ selected: o === value })}>${esc(o)}</option>`).join('') +
    `</select>${icon({ name: 'chevron-down', size: 18 })}</span>` +
    fieldError(name, error) +
    `</label>`;
