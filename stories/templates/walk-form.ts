import { checkbox } from '../atoms/checkbox.markup';
import { fileUpload } from '../atoms/file-upload.markup';
import { select } from '../atoms/select.markup';
import { textField } from '../atoms/text-field.markup';
import { textarea } from '../atoms/textarea.markup';
import { choiceGroup } from '../molecules/choice-group.markup';
import { form, formFieldset, formRow, formSummary, formText } from '../molecules/form.markup';
import { infoBox } from '../molecules/info-box.markup';
import type { Content, Locale } from './content';

// CountrySelect lists every country by name in the page language; a few suffice here.
const countries = (locale: Locale) => {
  const names = new Intl.DisplayNames([locale], { type: 'region' });
  return ['DE', 'JP', 'GB', 'US', 'FR'].map((code) => names.of(code) ?? code);
};

export type WalkFormStep = 0 | 1 | 2 | 'summary';

// The demo's form over three pages and a summary: every element type EXT:form offers, in the theme's parts.
export const walkForm = (c: Content, step: WalkFormStep = 0): string => {
  const w = c.walkForm;
  const req = (label: string) => `${label} *`;
  const pages: string[][] = [
    [
      formText(w.introTitle, w.introText),
      textField({ label: req(w.name), name: 'name', autocomplete: 'name', required: true }),
      textField({ label: req(w.email), name: 'email', type: 'email', autocomplete: 'email', required: true }),
      textField({ label: w.phone, name: 'phone', type: 'tel', autocomplete: 'tel' }),
      textField({ label: w.website, name: 'website', type: 'url', description: w.websiteHint }),
      textField({ label: w.groupSize, name: 'group', type: 'number', min: 1, max: 12, value: '2' }),
      formRow([
        textField({ label: w.arrival, name: 'arrival', type: 'date' }),
        textField({ label: w.departure, name: 'departure', placeholder: 'd.m.Y', description: w.departureHint }),
      ]),
      formFieldset(w.account, [
        textField({ label: w.password, name: 'password', type: 'password', autocomplete: 'current-password' }),
        textField({ label: w.newPassword, name: 'new-password', type: 'password', autocomplete: 'new-password' }),
        textField({ label: w.confirmPassword, name: 'new-password-confirmation', type: 'password', autocomplete: 'new-password' }),
      ]),
    ],
    [
      choiceGroup({
        legend: w.route,
        name: 'route',
        options: w.routes.map((r, i) => ({ label: r, value: String(i + 1), checked: i === 0 })),
      }),
      select({ label: w.pace, name: 'pace', options: w.paces }),
      choiceGroup({
        legend: w.interests,
        name: 'interests',
        type: 'checkbox',
        options: w.interestOptions.map((o, i) => ({ label: o, value: String(i + 1) })),
      }),
      select({ label: w.languages, name: 'languages', options: w.languageOptions, multiple: true }),
      select({ label: w.country, name: 'country', options: countries(c.locale) }),
      // ContentElement of EXT:form: any content element, here an Info Box.
      `<div class="form-content">${infoBox({ title: w.luggageTitle, text: w.luggageText })}</div>`,
      textarea({ label: w.notes, name: 'notes', rows: 4 }),
      checkbox({ label: req(w.consent), name: 'consent', required: true }),
    ],
    [
      fileUpload({
        label: w.photo,
        name: 'photo',
        accept: 'image/jpeg,image/png',
        dropLabel: c.ui.uploadDrop,
        chooseLabel: c.ui.uploadChoose,
        description: w.photoHint,
      }),
      fileUpload({
        label: w.routeFile,
        name: 'route-file',
        accept: 'application/pdf',
        dropLabel: c.ui.uploadDrop,
        chooseLabel: c.ui.uploadChoose,
        description: w.fileHint,
        files: ['nakahechi.pdf'],
        removeLabel: w.remove,
      }),
    ],
  ];
  const summary = formSummary([
    {
      title: w.steps[0],
      facts: [
        { label: w.name, value: 'Aiko Tanaka' },
        { label: w.email, value: 'aiko@example.com' },
        { label: w.groupSize, value: '2' },
      ],
    },
    {
      title: w.steps[1],
      facts: [
        { label: w.route, value: w.routes[0] },
        { label: w.pace, value: w.paces[1] },
        { label: w.languages, value: w.languageOptions.slice(0, 2).join(', ') },
      ],
    },
    { title: w.steps[2], facts: [{ label: w.routeFile, value: 'nakahechi.pdf' }] },
  ]);
  const index = step === 'summary' ? 3 : step;
  return form({
    action: '#',
    steps: { label: c.ui.formSteps, names: [...w.steps, w.summaryTitle], current: index },
    fields: step === 'summary' ? [summary] : pages[step],
    note: step === 'summary' ? undefined : c.ui.requiredNote,
    previous: index > 0 ? w.previous : undefined,
    submit: step === 'summary' ? w.submit : w.next,
  });
};

export const walkFormSent = (c: Content): string => infoBox({ title: c.ui.formSent, text: c.walkForm.sentText });
