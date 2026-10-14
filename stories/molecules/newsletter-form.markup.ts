import { attrs } from '../../src/lib/html';
import { button } from '../atoms/button.markup';
import { checkbox } from '../atoms/checkbox.markup';
import { textField } from '../atoms/text-field.markup';

export interface NewsletterFormProps {
  action: string;
  emailLabel?: string;
  consent?: string;
  submit?: string;
  placeholder?: string;
}

export const newsletterForm = ({
  action,
  emailLabel = 'Email address',
  consent = 'I would like to receive the newsletter and have read the privacy policy.',
  submit = 'Subscribe',
  placeholder = 'name@example.com',
}: NewsletterFormProps): string =>
  `<form${attrs({ class: 'newsletter-form', action, method: 'post' })}>` +
  textField({ label: emailLabel, name: 'email', type: 'email', placeholder, required: true }) +
  checkbox({ label: consent, name: 'consent', required: true }) +
  `<div>${button({ label: submit, type: 'submit' })}</div></form>`;
