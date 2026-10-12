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
    `<div class="icon-fact">${iconCircle({ name: icon })}<div class="icon-fact-text">` +
    `<p class="icon-fact-label type-label">${esc(label)}</p>` +
    `<p class="icon-fact-value type-button">${esc(value)}</p>` +
    (note ? `<p class="icon-fact-note type-caption">${esc(note)}</p>` : '') +
    `</div></div>`;
