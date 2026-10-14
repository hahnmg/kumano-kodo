import { esc } from '../../src/lib/html';
import { icon } from './icon.markup';

// The message a control points to with aria-describedby; its id follows the field name.
export const fieldErrorId = (name: string): string => `${name}-error`;
export const fieldDescriptionId = (name: string): string => `${name}-desc`;

export const fieldError = (name: string, error?: string): string =>
  error
    ? `<span class="field-error type-caption" id="${esc(fieldErrorId(name))}">${icon({ name: 'alert', size: 16 })}${esc(error)}</span>`
    : '';

export const fieldDescription = (name: string, description?: string): string =>
  description ? `<span class="field-description type-caption" id="${esc(fieldDescriptionId(name))}">${esc(description)}</span>` : '';

// An error replaces the description in aria-describedby, as EXT:form does.
export const invalidAttrs = (name: string, error?: string, description?: string): Record<string, string | undefined> =>
  error
    ? { 'aria-invalid': 'true', 'aria-describedby': fieldErrorId(name) }
    : description
      ? { 'aria-describedby': fieldDescriptionId(name) }
      : {};
