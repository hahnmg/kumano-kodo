import { attrs, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';

export interface TopbarProps {
    label: string;
    value: string;
    phone: string;
    email: string;
}

export const topbar = ({ label, value, phone, email }: TopbarProps): string =>
    `<aside class="topbar" aria-label="Kontakt und Öffnungszeiten">` +
    `<p class="topbar__hours">${icon({ name: 'clock', size: 16 })}<strong class="type-button">${esc(label)}</strong> <span class="type-small">${esc(value)}</span></p>` +
    `<p class="topbar__contact">` +
    `<a${attrs({ class: 'type-small', href: `tel:${phone.replace(/\s/g, '')}` })}>${icon({ name: 'phone', size: 16 })}${esc(phone)}</a>` +
    `<a${attrs({ class: 'type-small', href: `mailto:${email}` })}>${icon({ name: 'mail', size: 16 })}${esc(email)}</a>` +
    `</p></aside>`;
