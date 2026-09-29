import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
    stories: ['../stories/**/*.stories.ts'],
    framework: { name: '@storybook/html-vite', options: {} },
    staticDirs: [{ from: '../img', to: '/img' }],
};

export default config;
