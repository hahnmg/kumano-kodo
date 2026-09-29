import type { Meta, StoryObj } from '@storybook/html-vite';
import { kumanoHome } from './kumano-home.markup';
import { detailPage, listPage, startPage } from './standard-pages.markup';

const meta: Meta = { title: 'Templates', parameters: { layout: 'fullscreen' } };
export default meta;

export const KumanoHome: StoryObj = { name: 'Kumano Home', render: kumanoHome };
export const Start: StoryObj = { render: startPage };
export const List: StoryObj = { render: listPage };
export const Detail: StoryObj = { render: detailPage };
