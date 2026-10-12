import { esc } from '../../src/lib/html';
import { chip, type ChipProps } from '../atoms/chip.markup';
import { breadcrumb, type BreadcrumbItem } from '../molecules/breadcrumb.markup';

export interface PageHeaderProps {
    title: string;
    breadcrumb: BreadcrumbItem[];
    chips?: ChipProps[];
    chipsLabel?: string;
    breadcrumbLabel?: string;
}

export const pageHeader = ({
    title,
    breadcrumb: trail,
    chips = [],
    chipsLabel = 'In this section',
    breadcrumbLabel,
}: PageHeaderProps): string =>
    `<div class="page-header"><div class="page-header-inner">${breadcrumb({ items: trail, label: breadcrumbLabel })}` +
    `<h1 class="page-header-title type-h2">${esc(title)}</h1>` +
    (chips.length ? `<nav class="page-header-chips" aria-label="${esc(chipsLabel)}">${chips.map(chip).join('')}</nav>` : '') +
    `</div></div>`;
