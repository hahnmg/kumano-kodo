import { esc } from '../../src/lib/html';

export interface JournalOpenerProps {
    kicker: string;
    title: string;
    lede: string;
    meta: string;
    // Set vertically as the one graphic element; decorative, the kicker carries the same name.
    vertical?: string;
}

export const journalOpener = ({ kicker, title, lede, meta, vertical }: JournalOpenerProps): string =>
    `<header class="journal-opener"><div class="journal-opener__inner">` +
    `<div class="journal-opener__title"><p class="journal-opener__kicker type-label">${esc(kicker)}</p>` +
    `<h1 class="type-hero">${esc(title)}</h1></div>` +
    `<div class="journal-opener__lede"><p class="type-lead">${esc(lede)}</p><p class="journal-opener__meta type-caption">${esc(meta)}</p></div>` +
    (vertical ? `<p class="journal-opener__vertical" aria-hidden="true">${esc(vertical)}</p>` : '') +
    `</div></header>`;
