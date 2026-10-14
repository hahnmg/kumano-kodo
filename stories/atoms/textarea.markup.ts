import { attrs, esc } from '../../src/lib/html';
import { fieldError, invalidAttrs } from './field-error.markup';

export interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
}

export const textarea = ({ label, name, placeholder, rows = 4, required, error }: TextareaProps): string =>
  `<label${attrs({ class: 'field' })}>` +
  `<span class="field-label type-label">${esc(label)}</span>` +
  `<span class="field-box"><textarea${attrs({ class: 'field-control field-control-textarea type-small', name, placeholder, rows, required, ...invalidAttrs(name, error) })}></textarea></span>` +
  fieldError(name, error) +
  `</label>`;
