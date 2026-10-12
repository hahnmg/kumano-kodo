import { attrs, esc } from '../../src/lib/html';
import { fieldDescription, fieldError, invalidAttrs } from './field-error.markup';
import { icon } from './icon.markup';

export interface SelectProps {
    label: string;
    name: string;
    options: string[];
    value?: string | string[];
    required?: boolean;
    error?: string;
    description?: string;
    /** A list box with several choices; it shows `size` rows and no chevron. */
    multiple?: boolean;
    size?: number;
}

export const select = ({ label, name, options, value, required, error, description, multiple, size = 4 }: SelectProps): string => {
    const chosen = ([] as string[]).concat(value ?? []);
    return (
        `<label${attrs({ class: 'field' })}>` +
        `<span class="field-label type-label">${esc(label)}</span>` +
        `<span class="field-box">` +
        `<select${attrs({
            class: multiple ? 'field-control field-control-multiple type-small' : 'field-control field-control-select type-small',
            name,
            required,
            multiple,
            size: multiple ? size : undefined,
            ...invalidAttrs(name, error, description),
        })}>` +
        options.map((o) => `<option${attrs({ selected: chosen.includes(o) })}>${esc(o)}</option>`).join('') +
        `</select>${multiple ? '' : icon({ name: 'chevron-down', size: 18 })}</span>` +
        fieldError(name, error) +
        fieldDescription(name, description) +
        `</label>`
    );
};
