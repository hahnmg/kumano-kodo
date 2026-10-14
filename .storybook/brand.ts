import { create } from 'storybook/theming/create';
import variables from '../docs/figma-export/variables.json';

// Storybook's chrome cannot read the theme's custom properties, so it takes Mono's values from the Figma export.
const vars = variables.collections.Theme.vars as Record<string, { v: Record<string, string | number> }>;
const token = (name: string) => vars[name].v.Mono;

export const brandTheme = (scheme: 'light' | 'dark') => {
  const colour = (name: string) => String(token(`palette/${scheme}/${name}`));
  return create({
    base: scheme,
    brandTitle:
      `<span style="display:flex;flex-direction:column;gap:6px;color:${colour('ink')}">` +
      `<span style="font:600 17px/1 Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase">Kumano Kodo</span>` +
      `<span style="display:flex;align-items:center;gap:6px;font:500 12px/1 Inter,sans-serif;color:${colour('muted')}">for ` +
      `<img src="./typo3-logo.svg" alt="TYPO3" height="16" style="display:block"></span></span>`,
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
