import { attrs, esc } from '../../src/lib/html';
import logos from '../../docs/figma-export/logos.json';

export type LogoMark = 'classic' | 'modern';

const group = (className: string, paths: string[]): string =>
    `<g class="${className}">${paths.map((d) => `<path d="${d}"/>`).join('')}</g>`;

// Both marks as exported from Figma; the groups bird and text carry the colours (see logo.css).
const mark = (name: LogoMark): string => {
    const { width, height, bird, text } = logos[name];
    return (
        `<svg class="logo__mark logo__mark--${name}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="currentColor" aria-hidden="true" focusable="false">` +
        `${group('logo__bird', bird)}${group('logo__text', text)}</svg>`
    );
};

// The bird alone, for places that explain it; decorative, so it stays out of the accessibility tree.
export const logoBird = (className = 'logo__bird'): string =>
    `<svg class="${className}" viewBox="0 0 62 55" fill="currentColor" aria-hidden="true" focusable="false">${logos.classic.bird.map((d) => `<path d="${d}"/>`).join('')}</svg>`;

export interface LogoProps {
    href?: string;
    label?: string;
    /** `title` sets the site name in type, for a site without a logo of its own. */
    variant?: 'mark' | 'title';
}

// Caramel shows the classic mark, every other theme the modern one; CSS picks by data-theme.
export const logo = ({ href = '/', label = 'Kumano Kodo', variant = 'mark' }: LogoProps = {}): string =>
    variant === 'title'
        ? `<a class="logo logo--title type-logo"${attrs({ href })}>${esc(label)}</a>`
        : `<a class="logo"${attrs({ href, 'aria-label': label })}>${mark('classic')}${mark('modern')}</a>`;
