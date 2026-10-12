import { attrs } from '../../src/lib/html';
import { icon } from './icon.markup';

export interface BackToTopProps {
    label?: string;
    visible?: boolean;
}

// Hidden until src/scripts/back-to-top.ts finds the page scrolled past one screen.
export const backToTop = ({ label = 'Back to top', visible = false }: BackToTopProps = {}): string =>
    `<button${attrs({ class: 'back-to-top', type: 'button', 'aria-label': label, 'data-visible': visible })}>${icon({ name: 'arrow-right', size: 20 })}</button>`;
