import { attrs, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';

export interface TopbarProps {
    label: string;
    value: string;
    phone: string;
    email: string;
    ariaLabel?: string;
}

export const topbar = ({ label, value, phone, email, ariaLabel = 'Trail status and contact' }: TopbarProps): string =>
    `<aside class="topbar" aria-label="${esc(ariaLabel)}">` +
    `<p class="topbar-hours">${icon({ name: 'clock', size: 16 })}<strong class="type-button">${esc(label)}</strong> <span class="type-small">${esc(value)}</span></p>` +
    `<p class="topbar-contact">` +
    `<a${attrs({ class: 'type-small', href: `tel:${phone.replace(/\s/g, '')}` })}>${icon({ name: 'phone', size: 16 })}${esc(phone)}</a>` +
    `<a${attrs({ class: 'type-small', href: `mailto:${email}` })}>${icon({ name: 'mail', size: 16 })}${esc(email)}</a>` +
    `</p></aside>`;
