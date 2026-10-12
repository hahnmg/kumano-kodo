import { attrs, esc } from '../../src/lib/html';
import { icon } from '../atoms/icon.markup';

export interface FaqItemProps {
    question: string;
    answer: string;
    open?: boolean;
}

export const faqItem = ({ question, answer, open = false }: FaqItemProps): string =>
    `<details${attrs({ class: 'faq-item', open })}>` +
    `<summary class="faq-item-question"><span class="type-h4-regular">${esc(question)}</span>${icon({ name: 'chevron-down', size: 20 })}</summary>` +
    `<p class="faq-item-answer type-body">${esc(answer)}</p></details>`;

export const faqList = (items: FaqItemProps[]): string => `<div class="faq-list">${items.map(faqItem).join('')}</div>`;
