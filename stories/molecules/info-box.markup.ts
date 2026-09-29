import { attrs, esc } from '../../src/lib/html';

export interface InfoBoxProps {
    title: string;
    text: string;
    links?: { label: string; href: string }[];
}

export const infoBox = ({ title, text, links = [] }: InfoBoxProps): string =>
    `<aside class="info-box"><h2 class="info-box__title type-label">${esc(title)}</h2>` +
    `<p class="info-box__text type-small">${esc(text)}</p>` +
    (links.length
        ? `<ul class="info-box__links">${links.map((l) => `<li><a${attrs({ class: 'type-button', href: l.href })}>${esc(l.label)}</a></li>`).join('')}</ul>`
        : '') +
    `</aside>`;
