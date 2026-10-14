import { attrs, esc } from '../../src/lib/html';
import { button } from '../atoms/button.markup';

export interface FormSteps {
  label: string;
  names: string[];
  /** Zero-based index of the step shown. */
  current: number;
}

export interface FormProps {
  action: string;
  // Rendered fields, in order: text fields, selects, text areas, choices.
  fields: string[];
  submit: string;
  note?: string;
  /** A form over several pages: the numbered steps above, and a way back below. */
  steps?: FormSteps;
  previous?: string;
}

// The steps are not links: EXT:form moves between pages only with its buttons.
export const formSteps = ({ label, names, current }: FormSteps): string =>
  `<ol${attrs({ class: 'form-steps type-small', 'aria-label': label })}>` +
  names
    .map(
      (n, i) =>
        `<li${attrs({ class: 'form-steps-item', 'aria-current': i === current ? 'step' : undefined })}><span class="form-steps-number">${i + 1}</span> ${esc(n)}</li>`,
    )
    .join('') +
  `</ol>`;

// The frame EXT:form renders its elements into: one column, the note on required fields, the buttons.
export const form = ({ action, fields, submit, note, steps, previous }: FormProps): string =>
  `<form${attrs({ class: 'form', action, method: 'post' })}>` +
  (steps ? formSteps(steps) : '') +
  fields.join('') +
  (note ? `<p class="form-note type-caption">${esc(note)}</p>` : '') +
  `<div class="form-navigation">${previous ? button({ label: previous, variant: 'secondary', type: 'submit' }) : ''}${button({ label: submit, type: 'submit' })}</div>` +
  `</form>`;

// Fieldset of EXT:form: a group of fields under a legend.
export const formFieldset = (legend: string, fields: string[]): string =>
  `<fieldset class="form-fieldset"><legend class="form-fieldset-legend type-h4">${esc(legend)}</legend>${fields.join('')}</fieldset>`;

// GridRow of EXT:form: its columns side by side, stacked on narrow screens.
export const formRow = (fields: string[]): string =>
  `<div class="form-row">${fields.map((f) => `<div class="stack" style="--stack-gap: var(--space-24)">${f}</div>`).join('')}</div>`;

// StaticText of EXT:form; its text may carry simple HTML.
export const formText = (title: string, text: string): string =>
  `<div class="form-text"><h2 class="type-h4">${esc(title)}</h2><div class="form-text-body type-small">${esc(text)}</div></div>`;

// SummaryPage of EXT:form: it lists all answers in one run, a page's label opening each section.
export const formSummary = (pages: { title: string; facts: { label: string; value: string }[] }[]): string =>
  `<div class="form-summary">` +
  pages
    .map(
      (p) =>
        `<h2 class="form-summary-section type-h4">${esc(p.title)}</h2>` +
        p.facts
          .map(
            (f) =>
              `<dl class="form-summary-row"><dt class="type-caption">${esc(f.label)}</dt><dd class="type-small">${esc(f.value)}</dd></dl>`,
          )
          .join(''),
    )
    .join('') +
  `</div>`;
