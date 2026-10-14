import { esc } from '../../src/lib/html';
import { iconButton } from '../atoms/icon-button.markup';

export type SectionHeadingVariant = 'default' | 'with-aside' | 'with-controls';

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  aside?: string;
  variant?: SectionHeadingVariant;
  level?: 1 | 2;
  controlLabels?: { previous: string; next: string };
}

export const sectionHeading = ({ title, eyebrow, aside, variant = 'default', level = 2, controlLabels }: SectionHeadingProps): string => {
  const heading =
    `<div class="section-heading-main">` +
    (eyebrow ? `<p class="section-heading-eyebrow type-label">${esc(eyebrow)}</p>` : '') +
    `<h${level} class="section-heading-title type-h2">${esc(title)}</h${level}></div>`;
  const end =
    variant === 'with-aside' && aside
      ? `<p class="section-heading-aside type-small">${esc(aside)}</p>`
      : variant === 'with-controls'
        ? `<div class="section-heading-controls">${iconButton({ direction: 'previous', label: controlLabels?.previous })}${iconButton({ direction: 'next', label: controlLabels?.next })}</div>`
        : '';
  return `<header class="section-heading section-heading-${variant}">${heading}${end}</header>`;
};
