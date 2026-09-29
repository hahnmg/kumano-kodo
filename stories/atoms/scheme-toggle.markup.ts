import { attrs } from '../../src/lib/html';

export interface SchemeToggleProps {
    label?: string;
    pressed?: boolean;
}

// A pressed-state button; src/scripts/scheme-toggle.ts flips data-scheme on <html> and keeps aria-pressed in step.
export const schemeToggle = ({ label = 'Dark mode', pressed = false }: SchemeToggleProps = {}): string =>
    `<button${attrs({ class: 'scheme-toggle', type: 'button', 'aria-label': label, 'aria-pressed': String(pressed) })}><span class="scheme-toggle__dot"></span></button>`;
