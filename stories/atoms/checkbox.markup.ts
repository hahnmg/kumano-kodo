import { attrs, esc } from '../../src/lib/html';

export interface CheckboxProps {
    label: string;
    name: string;
    checked?: boolean;
    required?: boolean;
}

export const checkbox = ({ label, name, checked, required }: CheckboxProps): string =>
    `<label class="choice choice--checkbox">` +
    `<input${attrs({ class: 'choice__input', type: 'checkbox', name, checked, required })}>` +
    `<span class="choice__label type-caption">${esc(label)}</span>` +
    `</label>`;
