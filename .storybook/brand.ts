import { create } from 'storybook/theming/create';
import logos from '../docs/figma-export/logos.json';
import variables from '../docs/figma-export/variables.json';

// Storybook's chrome cannot read the theme's custom properties, so it takes Caramel's values from the Figma export.
const vars = variables.collections.Theme.vars as Record<string, { v: Record<string, string | number> }>;
const token = (name: string) => vars[name].v.Caramel;

const paths = (list: string[], fill: string) => list.map((d) => `<path fill="${fill}" d="${d}"/>`).join('');

export const brandTheme = (scheme: 'light' | 'dark') => {
    const colour = (name: string) => String(token(`palette/${scheme}/${name}`));
    const { width, height, bird, text } = logos.classic;
    const mark =
        `<svg viewBox="0 0 ${width} ${height}" width="160" role="img" aria-label="Kumano Kodo">` +
        `${paths(bird, colour('accent'))}${paths(text, colour('ink'))}</svg>`;
    return create({
        base: scheme,
        brandTitle:
            `<span style="display:flex;flex-direction:column;gap:6px">${mark}` +
            `<span style="font:500 12px/1 Inter,sans-serif;letter-spacing:.06em;color:${colour('muted')}">for TYPO3</span></span>`,
        brandUrl: './',
        brandTarget: '_self',
        colorPrimary: colour('accent'),
        colorSecondary: colour('accent'),
        appBg: colour('sunk'),
        appContentBg: colour('paper'),
        appPreviewBg: colour('paper'),
        appBorderColor: colour('line'),
        appBorderRadius: Number(token('radius/button')),
        fontBase: '"Inter", "Noto Sans JP", system-ui, sans-serif',
        textColor: colour('ink'),
        textMutedColor: colour('muted'),
        barBg: colour('paper'),
        barTextColor: colour('muted'),
        barSelectedColor: colour('accent'),
        barHoverColor: colour('accent'),
        inputBg: colour('surface'),
        inputBorder: colour('hair'),
        inputTextColor: colour('ink'),
    });
};
