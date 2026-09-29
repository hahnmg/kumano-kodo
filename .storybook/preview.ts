import type { Preview } from '@storybook/html-vite';
import '../src/tokens/tokens.css';
import '../src/styles/base.css';

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Theme',
            toolbar: { icon: 'paintbrush', items: ['caramel', 'forest', 'ocean', 'violet'], dynamicTitle: true },
        },
        scheme: {
            description: 'Colour scheme',
            toolbar: { icon: 'contrast', items: ['light', 'dark'], dynamicTitle: true },
        },
    },
    initialGlobals: { theme: 'caramel', scheme: 'light' },
    decorators: [
        (story, context) => {
            document.documentElement.dataset.theme = context.globals.theme;
            document.documentElement.dataset.scheme = context.globals.scheme;
            return story();
        },
    ],
    parameters: { layout: 'padded' },
};

export default preview;
