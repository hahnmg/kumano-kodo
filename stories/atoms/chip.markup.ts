import { attrs, cx, esc } from '../../src/lib/html';

export interface ChipProps {
    label: string;
    href: string;
    active?: boolean;
}

export const chip = ({ label, href, active = false }: ChipProps): string =>
    `<a${attrs({ class: cx('chip', 'type-button', active && 'chip--active'), href, 'aria-current': active ? 'page' : undefined })}>${esc(label)}</a>`;
