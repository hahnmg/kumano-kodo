import { attrs } from '../../src/lib/html';

export interface MenuButtonProps {
    label?: string;
    expanded?: boolean;
}

// Opens the folded navigation on narrow screens; src/scripts/menu-toggle.ts keeps aria-expanded in step.
export const menuButton = ({ label = 'Menu', expanded = false }: MenuButtonProps = {}): string =>
    `<button${attrs({ class: 'menu-button', type: 'button', 'aria-label': label, 'aria-expanded': String(expanded) })}>` +
    `<span class="menu-button-bar"></span><span class="menu-button-bar"></span></button>`;
