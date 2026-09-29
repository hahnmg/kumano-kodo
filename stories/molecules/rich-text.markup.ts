export interface RichTextProps {
    // Trusted editorial HTML (headings, paragraphs, lists, links) from the CMS; not escaped.
    html: string;
}

export const richText = ({ html }: RichTextProps): string => `<div class="rich-text">${html}</div>`;
