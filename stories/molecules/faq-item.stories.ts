import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, localized } from '../templates/content';
import { faqItem, faqList, type FaqItemProps } from './faq-item.markup';

const item = (p: FaqItemProps) => `<div style="max-width:764px">${faqItem(p)}</div>`;

const meta: Meta<FaqItemProps> = { title: 'Molecules/FAQ Item' };
export default meta;

export const Open: StoryObj<FaqItemProps> = { render: localized(item, (c) => c.kumano.faq[0]) };
export const Closed: StoryObj<FaqItemProps> = { render: localized(item, (c) => c.kumano.faq[1]) };
export const List: StoryObj<FaqItemProps> = {
  render: (_, { globals }) => `<div style="max-width:764px">${faqList(content(globals.locale).kumano.faq)}</div>`,
};
