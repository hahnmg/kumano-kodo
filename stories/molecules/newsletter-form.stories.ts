import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { newsletterForm, type NewsletterFormProps } from './newsletter-form.markup';

const meta: Meta<NewsletterFormProps> = {
    title: 'Molecules/Newsletter Form',
    render: localized(
        (p: NewsletterFormProps) => `<div style="max-width:539px">${newsletterForm(p)}</div>`,
        ({ ui }) => ({ emailLabel: ui.emailAddress, placeholder: ui.emailPlaceholder, consent: ui.consent, submit: ui.subscribe }),
    ),
    args: { action: '#' },
};
export default meta;

export const NewsletterForm: StoryObj<NewsletterFormProps> = {};
