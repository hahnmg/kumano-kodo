import { esc } from '../../src/lib/html';
import { logoBird } from '../atoms/logo.markup';

export interface HighlightProps {
    eyebrow?: string;
    title: string;
    text: string;
    level?: 2 | 3;
}

export const highlight = ({ eyebrow, title, text, level = 2 }: HighlightProps): string =>
    `<div class="highlight">${logoBird('highlight__emblem')}<div class="highlight__body">` +
    (eyebrow ? `<p class="highlight__eyebrow type-label">${esc(eyebrow)}</p>` : '') +
    `<h${level} class="highlight__title type-h3">${esc(title)}</h${level}>` +
    `<p class="highlight__text type-lead">${esc(text)}</p></div></div>`;
