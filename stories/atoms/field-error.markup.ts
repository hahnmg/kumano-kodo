import { esc } from '../../src/lib/html';
import { icon } from './icon.markup';

// The message a control points to with aria-describedby; its id follows the field name.
export const fieldErrorId = (name: string): string => `${name}-error`;

export const fieldError = (name: string, error?: string): string =>
    error
        ? `<span class="field__error type-caption" id="${esc(fieldErrorId(name))}">${icon({ name: 'alert', size: 16 })}${esc(error)}</span>`
        : '';

export const invalidAttrs = (name: string, error?: string): Record<string, string | undefined> =>
    error ? { 'aria-invalid': 'true', 'aria-describedby': fieldErrorId(name) } : {};
