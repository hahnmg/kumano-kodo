import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../stories/start.mdx', '../stories/status.mdx', '../stories/fluid-components.mdx', '../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/html-vite', options: {} },
  staticDirs: [
    { from: '../img', to: '/img' },
    { from: '../files', to: '/files' },
    { from: '../typo3/packages/theme_kumano_kodo/Resources/Public/Fonts', to: '/fonts' },
    { from: './favicon.svg', to: '/favicon.svg' },
    { from: './typo3-logo.svg', to: '/typo3-logo.svg' },
  ],
};

export default config;
