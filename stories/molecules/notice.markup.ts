import { esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';

export interface NoticeProps {
  title: string;
  text: string;
}

export const notice = ({ title, text }: NoticeProps): string =>
  `<div class="notice" role="note">${icon({ name: 'alert' })}` +
  `<div class="notice-body"><strong class="notice-title type-label">${esc(title)}</strong> <div class="notice-text type-small"><p>${esc(text)}</p></div></div></div>`;
