import { esc } from '../../src/lib/html';

export interface QuoteProps {
    quote: string;
    source: string;
}

export const quote = ({ quote: text, source }: QuoteProps): string =>
    `<figure class="quote"><blockquote class="quote__text type-quote"><p>${esc(text)}</p></blockquote>` +
    `<figcaption class="quote__source type-label">${esc(source)}</figcaption></figure>`;
