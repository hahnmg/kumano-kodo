import type { Meta, StoryObj } from '@storybook/html-vite';
import { checkbox } from '../atoms/checkbox.markup';
import { textField } from '../atoms/text-field.markup';
import { textarea } from '../atoms/textarea.markup';
import { content } from '../templates/content';
import { form } from './form.markup';
import { infoBox } from './info-box.markup';
import { walkForm, walkFormSent, type WalkFormStep } from '../templates/walk-form';

const meta: Meta = { title: 'Molecules/Form' };
export default meta;

const contact =
  (invalid: boolean): StoryObj['render'] =>
  (_, { globals }) => {
    const { ui } = content(globals.locale);
    return form({
      action: '#',
      fields: [
        textField({ label: `${ui.name} *`, name: 'name', required: true, error: invalid ? ui.fieldRequired : undefined }),
        textField({
          label: `${ui.emailAddress} *`,
          name: 'email',
          type: 'email',
          required: true,
          value: invalid ? 'name@' : undefined,
          error: invalid ? ui.emailInvalid : undefined,
        }),
        textarea({ label: `${ui.message} *`, name: 'message', rows: 5, required: true }),
        checkbox({
          label: `${ui.contactConsent} *`,
          name: 'consent',
          required: true,
          error: invalid ? ui.fieldRequired : undefined,
        }),
      ],
      note: ui.requiredNote,
      submit: ui.send,
    });
  };

export const Form: StoryObj = { render: contact(false) };
export const Invalid: StoryObj = { render: contact(true) };
// After sending, EXT:form replaces the form by its confirmation, shown as an Info Box.
export const Sent: StoryObj = {
  render: (_, { globals }) => {
    const { ui } = content(globals.locale);
    return infoBox({ title: ui.formSent, text: ui.formSentText });
  },
};

// The demo's form over several pages, with every element type EXT:form offers.
const walk =
  (step: WalkFormStep): StoryObj['render'] =>
  (_, { globals }) =>
    walkForm(content(globals.locale), step);

export const StepAboutYou: StoryObj = { name: 'Steps · 1 About you', render: walk(0) };
export const StepYourWalk: StoryObj = { name: 'Steps · 2 Your walk', render: walk(1) };
export const StepPhotos: StoryObj = { name: 'Steps · 3 Photos', render: walk(2) };
export const StepSummary: StoryObj = { name: 'Steps · Summary', render: walk('summary') };
export const StepSent: StoryObj = { name: 'Steps · Sent', render: (_, { globals }) => walkFormSent(content(globals.locale)) };
