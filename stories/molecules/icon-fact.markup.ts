import { esc } from '../../src/lib/html';
import type { IconName } from '../atoms/icon.markup';
import { iconCircle } from '../atoms/icon-circle.markup';

export interface IconFactProps {
    icon: IconName;
    label: string;
    value: string;
    note?: string;
}

export const iconFact = ({ icon, label, value, note }: IconFactProps): string =>
    `<div class="icon-fact">${iconCircle({ name: icon })}<div class="icon-fact__text">` +
    `<p class="icon-fact__label type-label">${esc(label)}</p>` +
    `<p class="icon-fact__value type-button">${esc(value)}</p>` +
    (note ? `<p class="icon-fact__note type-caption">${esc(note)}</p>` : '') +
    `</div></div>`;
