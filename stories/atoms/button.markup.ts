import { attrs, cx, esc } from '../../src/lib/html';

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outline';

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  href?: string;
  type?: 'button' | 'submit';
}

export const button = ({ label, variant = 'primary', href, type = 'button' }: ButtonProps): string => {
  const className = cx('button', 'type-button', `button-${variant}`);
  return href
    ? `<a${attrs({ class: className, href })}>${esc(label)}</a>`
    : `<button${attrs({ class: className, type })}>${esc(label)}</button>`;
};
