import { esc } from '../../src/lib/html';

export interface JournalOpenerProps {
    kicker: string;
    title: string;
    lede: string;
    meta: string;
    // Set vertically as the one graphic element; decorative, the kicker carries the same name.
    vertical?: string;
}

export const pageIntro = ({ kicker, title, lede, meta, vertical }: JournalOpenerProps): string =>
    `<header class="page-intro"><div class="page-intro-inner">` +
    `<div class="page-intro-title"><p class="page-intro-eyebrow type-label">${esc(kicker)}</p>` +
    `<h1 class="type-hero">${esc(title)}</h1></div>` +
    `<div class="page-intro-lede"><p class="type-lead">${esc(lede)}</p><p class="page-intro-meta type-caption">${esc(meta)}</p></div>` +
    (vertical ? `<p class="page-intro-upright" aria-hidden="true">${esc(vertical)}</p>` : '') +
    `</div></header>`;
