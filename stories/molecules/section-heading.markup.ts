import { esc } from '../../src/lib/html';
import { iconButton } from '../atoms/icon-button.markup';

export type SectionHeadingVariant = 'default' | 'with-aside' | 'with-controls';

export interface SectionHeadingProps {
    title: string;
    eyebrow?: string;
    aside?: string;
    variant?: SectionHeadingVariant;
    level?: 1 | 2;
}

export const sectionHeading = ({ title, eyebrow, aside, variant = 'default', level = 2 }: SectionHeadingProps): string => {
    const heading =
        `<div class="section-heading__main">` +
        (eyebrow ? `<p class="section-heading__eyebrow type-label">${esc(eyebrow)}</p>` : '') +
        `<h${level} class="section-heading__title type-h2">${esc(title)}</h${level}></div>`;
    const end =
        variant === 'with-aside' && aside
            ? `<p class="section-heading__aside type-small">${esc(aside)}</p>`
            : variant === 'with-controls'
              ? `<div class="section-heading__controls">${iconButton({ direction: 'previous' })}${iconButton({ direction: 'next' })}</div>`
              : '';
    return `<header class="section-heading section-heading--${variant}">${heading}${end}</header>`;
};
