import { attrs, esc } from '../../src/lib/html';

export type LinkDirection = 'forward' | 'back';

export interface LinkProps {
    label: string;
    href: string;
    direction?: LinkDirection;
}

export const link = ({ label, href, direction = 'forward' }: LinkProps): string => {
    const text = direction === 'back' ? `← ${label}` : `${label} →`;
    return `<a${attrs({ class: 'link type-button', href })}>${esc(text)}</a>`;
};
