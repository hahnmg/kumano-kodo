import { attrs, esc } from '../../src/lib/html';
import { fieldDescription, fieldError, invalidAttrs } from '../atoms/field-error.markup';

export type ChoiceGroupType = 'radio' | 'checkbox';

export interface ChoiceGroupProps {
    legend: string;
    name: string;
    type?: ChoiceGroupType;
    options: { label: string; value: string; checked?: boolean }[];
    error?: string;
    description?: string;
}

// RadioButton and MultiCheckbox of EXT:form: a fieldset whose legend names the group; the first box carries the error.
export const choiceGroup = ({ legend, name, type = 'radio', options, error, description }: ChoiceGroupProps): string =>
    `<fieldset class="field choice-group">` +
    `<legend class="field-label type-label">${esc(legend)}</legend>` +
    `<div class="choice-group-options">` +
    options
        .map(
            (o, i) =>
                `<label class="choice choice-${type}">` +
                `<input${attrs({ class: 'choice-input', type, name: type === 'checkbox' ? `${name}[]` : name, value: o.value, checked: o.checked, ...(i === 0 ? invalidAttrs(name, error, description) : {}) })}>` +
                `<span class="choice-label type-small">${esc(o.label)}</span></label>`,
        )
        .join('') +
    `</div>` +
    fieldError(name, error) +
    fieldDescription(name, description) +
    `</fieldset>`;
