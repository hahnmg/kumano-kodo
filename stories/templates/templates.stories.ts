import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, type Content } from './content';
import { kumanoHome } from './kumano-home.markup';
import { kumanoJournal } from './kumano-journal.markup';

const page =
    (render: (c: Content) => string): StoryObj['render'] =>
    (_, { globals }) =>
        render(content(globals.locale));

// The home page in the four themes, and the v3 home it replaced for comparison.
const meta: Meta = { title: 'Templates', tags: ['!autodocs', 'dev'], parameters: { layout: 'fullscreen', options: { showPanel: false } } };
export default meta;

export const HomeCaramel: StoryObj = { name: 'Home · Caramel', render: page(kumanoJournal), parameters: { theme: 'caramel' } };
export const HomeForest: StoryObj = { name: 'Home · Forest', render: page(kumanoJournal), parameters: { theme: 'forest' } };
export const HomeOcean: StoryObj = { name: 'Home · Ocean', render: page(kumanoJournal), parameters: { theme: 'ocean' } };
export const HomeViolet: StoryObj = { name: 'Home · Violet', render: page(kumanoJournal), parameters: { theme: 'violet' } };
export const HomeV3: StoryObj = { name: 'Home · v3 (previous)', render: page(kumanoHome) };
