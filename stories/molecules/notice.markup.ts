import { esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';

export interface NoticeProps {
  title: string;
  text: string;
}

export const notice = ({ title, text }: NoticeProps): string =>
  `<div class="notice" role="note">${icon({ name: 'alert' })}` +
  `<p class="notice-body"><strong class="notice-title type-label">${esc(title)}</strong> <span class="type-small">${esc(text)}</span></p></div>`;
