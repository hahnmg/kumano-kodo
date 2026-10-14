import { attrs, esc } from '../../src/lib/html';
import { backToTop as backToTopButton } from '../atoms/back-to-top.markup';
import { notice, type NoticeProps } from '../molecules/notice.markup';

export interface SiteFooterProps {
  /** The website title set large; decorative, so left out where empty. */
  wordmark?: string;
  about: string;
  columns: { title: string; links: { label: string; href?: string }[] }[];
  notice?: NoticeProps;
  copyright: string;
  legal: { label: string; href: string }[];
  /** Label of the back-to-top button; left out where empty. */
  backToTop?: string;
}

export const siteFooter = ({ wordmark, about, columns, notice: note, copyright, legal, backToTop }: SiteFooterProps): string =>
  `<footer class="site-footer">${wordmark ? `<p class="site-footer-wordmark type-wordmark" aria-hidden="true">${esc(wordmark)}</p>` : ''}` +
  `<div class="site-footer-columns"><p class="site-footer-about type-small">${esc(about)}</p>` +
  columns
    .map(
      (c) =>
        `<div class="site-footer-column"><h2 class="type-label">${esc(c.title)}</h2><ul>` +
        c.links
          .map((l) => `<li class="type-small">${l.href ? `<a${attrs({ href: l.href })}>${esc(l.label)}</a>` : esc(l.label)}</li>`)
          .join('') +
        `</ul></div>`,
    )
    .join('') +
  `</div>${note ? `<div class="site-footer-notice">${notice(note)}</div>` : ''}` +
  `<div class="site-footer-legal type-caption"><p>${esc(copyright)}</p><ul>` +
  legal.map((l) => `<li><a${attrs({ href: l.href })}>${esc(l.label)}</a></li>`).join('') +
  `</ul></div>${backToTop ? backToTopButton({ label: backToTop }) : ''}</footer>`;
