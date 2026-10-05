import type { Meta, StoryObj } from '@storybook/html-vite';
import { checkbox } from '../atoms/checkbox.markup';
import { textField } from '../atoms/text-field.markup';
import { textarea } from '../atoms/textarea.markup';
import { content } from '../templates/content';
import { form } from './form.markup';

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
