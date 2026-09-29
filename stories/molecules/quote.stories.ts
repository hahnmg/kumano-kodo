import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { quote, type QuoteProps } from './quote.markup';

const meta: Meta<QuoteProps> = { title: 'Molecules/Quote', render: localized(quote, (c) => c.home.quote) };
export default meta;

export const Quote: StoryObj<QuoteProps> = {};
