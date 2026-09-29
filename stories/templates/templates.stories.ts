import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, type Content } from './content';
import { kumanoHome } from './kumano-home.markup';
import { detailPage, listPage, startPage } from './standard-pages.markup';

const page =
    (render: (c: Content) => string): StoryObj['render'] =>
    (_, { globals }) =>
        render(content(globals.locale));

// Templates stay single stories in the sidebar; the four themes replace the old theme picker.
const meta: Meta = { title: 'Templates', tags: ['!autodocs', 'dev'], parameters: { layout: 'fullscreen', options: { showPanel: false } } };
export default meta;

export const KumanoHome: StoryObj = { name: 'Kumano Home · Caramel', render: page(kumanoHome), parameters: { theme: 'caramel' } };
export const KumanoHomeForest: StoryObj = { name: 'Kumano Home · Forest', render: page(kumanoHome), parameters: { theme: 'forest' } };
export const KumanoHomeOcean: StoryObj = { name: 'Kumano Home · Ocean', render: page(kumanoHome), parameters: { theme: 'ocean' } };
export const KumanoHomeViolet: StoryObj = { name: 'Kumano Home · Violet', render: page(kumanoHome), parameters: { theme: 'violet' } };
export const Start: StoryObj = { render: page(startPage) };
export const List: StoryObj = { render: page(listPage) };
export const Detail: StoryObj = { render: page(detailPage) };
