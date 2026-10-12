import { esc } from '../../src/lib/html';
import { logoBird } from '../atoms/logo.markup';

export interface HighlightProps {
    eyebrow?: string;
    title: string;
    text: string;
    level?: 2 | 3;
}

export const highlight = ({ eyebrow, title, text, level = 2 }: HighlightProps): string =>
    `<div class="highlight">${logoBird('highlight-emblem')}<div class="highlight-body">` +
    (eyebrow ? `<p class="highlight-eyebrow type-label">${esc(eyebrow)}</p>` : '') +
    `<h${level} class="highlight-title type-h3">${esc(title)}</h${level}>` +
    `<p class="highlight-text type-lead">${esc(text)}</p></div></div>`;
