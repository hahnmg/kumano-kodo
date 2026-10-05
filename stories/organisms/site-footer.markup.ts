import { attrs, esc } from '../../src/lib/html';
import { notice, type NoticeProps } from '../molecules/notice.markup';

export interface SiteFooterProps {
    /** The website title set large; decorative, so left out where empty. */
    wordmark?: string;
    about: string;
    columns: { title: string; links: { label: string; href?: string }[] }[];
    notice?: NoticeProps;
    copyright: string;
    legal: { label: string; href: string }[];
}

export const siteFooter = ({ wordmark, about, columns, notice: note, copyright, legal }: SiteFooterProps): string =>
    `<footer class="site-footer">${wordmark ? `<p class="site-footer__wordmark type-wordmark" aria-hidden="true">${esc(wordmark)}</p>` : ''}` +
    `<div class="site-footer__columns"><p class="site-footer__about type-small">${esc(about)}</p>` +
    columns
        .map(
            (c) =>
                `<div class="site-footer__column"><h2 class="type-label">${esc(c.title)}</h2><ul>` +
                c.links
                    .map((l) => `<li class="type-small">${l.href ? `<a${attrs({ href: l.href })}>${esc(l.label)}</a>` : esc(l.label)}</li>`)
                    .join('') +
                `</ul></div>`,
        )
        .join('') +
    `</div>${note ? `<div class="site-footer__notice">${notice(note)}</div>` : ''}` +
    `<div class="site-footer__legal type-caption"><p>${esc(copyright)}</p><ul>` +
    legal.map((l) => `<li><a${attrs({ href: l.href })}>${esc(l.label)}</a></li>`).join('') +
    `</ul></div></footer>`;
