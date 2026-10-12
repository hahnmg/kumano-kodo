import { attrs, cx, esc } from '../../src/lib/html';
import { fieldError, invalidAttrs } from './field-error.markup';

export interface CheckboxProps {
    label: string;
    name: string;
    checked?: boolean;
    required?: boolean;
    error?: string;
}

const choice = ({ label, name, checked, required, error }: CheckboxProps): string =>
    `<label${attrs({ class: cx('choice', 'choice-checkbox') })}>` +
    `<input${attrs({ class: 'choice-input', type: 'checkbox', name, checked, required, ...invalidAttrs(name, error) })}>` +
    `<span class="choice-label type-caption">${esc(label)}</span>` +
    `</label>`;

// With an error the message sits below the label, grouped with it, so the box keeps its alignment to its own text.
export const checkbox = (props: CheckboxProps): string =>
    props.error ? `<div class="choice-field">${choice(props)}${fieldError(props.name, props.error)}</div>` : choice(props);
