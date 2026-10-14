import { attrs, esc } from '../../src/lib/html';

export interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
}

export const radio = ({ label, name, value, checked }: RadioProps): string =>
  `<label class="choice choice-radio">` +
  `<input${attrs({ class: 'choice-input', type: 'radio', name, value, checked })}>` +
  `<span class="choice-label type-small">${esc(label)}</span>` +
  `</label>`;
