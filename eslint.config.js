import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['node_modules', 'storybook-static', '.diffyard-report', 'original', 'sections', 'docs/paper-snapshot', 'img', 'typo3', '.ddev'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
);
