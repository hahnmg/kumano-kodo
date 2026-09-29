import type { Meta, StoryObj } from '@storybook/html-vite';
import { kumano } from '../templates/content';
import { faqItem, faqList, type FaqItemProps } from './faq-item.markup';

const meta: Meta<FaqItemProps> = {
    title: 'Molecules/FAQ Item',
    tags: ['autodocs'],
    render: (args) => `<div style="max-width:764px">${faqItem(args)}</div>`,
};
export default meta;

export const Open: StoryObj<FaqItemProps> = { args: kumano.faq[0] };
export const Closed: StoryObj<FaqItemProps> = { args: kumano.faq[1] };
export const List: StoryObj<FaqItemProps> = { render: () => `<div style="max-width:764px">${faqList(kumano.faq)}</div>` };
