import { esc } from '../../src/lib/html';

export interface TableProps {
  caption: string;
  head: string[];
  rows: string[][];
}

export const table = ({ caption, head, rows }: TableProps): string =>
  `<div class="table-wrap"><table class="table"><caption class="visually-hidden">${esc(caption)}</caption>` +
  `<thead><tr>${head.map((h) => `<th scope="col" class="type-label">${esc(h)}</th>`).join('')}</tr></thead>` +
  `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td class="type-small">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>` +
  `</table></div>`;
