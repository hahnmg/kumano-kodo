import { attrs, esc } from '../../src/lib/html';
import { icon } from './icon.markup';

export interface SelectProps {
    label: string;
    name: string;
    options: string[];
    value?: string;
}

export const select = ({ label, name, options, value }: SelectProps): string =>
    `<label class="field">` +
    `<span class="field__label type-label">${esc(label)}</span>` +
    `<span class="field__box">` +
    `<select${attrs({ class: 'field__control field__control--select type-small', name })}>` +
    options.map((o) => `<option${attrs({ selected: o === value })}>${esc(o)}</option>`).join('') +
    `</select>${icon({ name: 'chevron-down', size: 18 })}</span>` +
    `</label>`;
