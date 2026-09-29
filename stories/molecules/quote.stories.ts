import type { Meta, StoryObj } from '@storybook/html-vite';
import { quote, type QuoteProps } from './quote.markup';

const meta: Meta<QuoteProps> = {
    title: 'Molecules/Quote',
    render: (args) => quote(args),
    args: {
        quote: '“The rain is part of it. Whoever comes in sunshine sees a different trail.”',
        source: 'Host of the minshuku in Chikatsuyu',
    },
};
export default meta;

export const Quote: StoryObj<QuoteProps> = {};
