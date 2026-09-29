import type { Meta, StoryObj } from '@storybook/html-vite';
import { newsletterForm, type NewsletterFormProps } from './newsletter-form.markup';

const meta: Meta<NewsletterFormProps> = {
    title: 'Molecules/Newsletter Form',
    render: (args) => `<div style="max-width:539px">${newsletterForm(args)}</div>`,
    args: { action: '#' },
};
export default meta;

export const NewsletterForm: StoryObj<NewsletterFormProps> = {};
