import { attrs, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';

export interface DownloadListProps {
    items: { title: string; meta: string; href: string }[];
}

export const downloadList = ({ items }: DownloadListProps): string =>
    `<ul class="download-list">` +
    items
        .map(
            (i) =>
                `<li><a${attrs({ class: 'download-list__row', href: i.href, download: true })}>${icon({ name: 'file' })}` +
                `<span class="download-list__text"><span class="type-button">${esc(i.title)}</span><span class="download-list__meta type-caption">${esc(i.meta)}</span></span>` +
                `${icon({ name: 'download' })}</a></li>`,
        )
        .join('') +
    `</ul>`;
