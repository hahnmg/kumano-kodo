import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
    stories: ['../stories/introduction.mdx', '../stories/core-theme-issues.mdx', '../stories/**/*.stories.ts'],
    addons: ['@storybook/addon-docs'],
    framework: { name: '@storybook/html-vite', options: {} },
    staticDirs: [
        { from: '../img', to: '/img' },
        { from: '../files', to: '/files' },
        { from: './favicon.svg', to: '/favicon.svg' },
        { from: './typo3-logo.svg', to: '/typo3-logo.svg' },
    ],
};

export default config;
