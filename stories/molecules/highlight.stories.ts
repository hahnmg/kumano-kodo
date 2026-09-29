import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { highlight, type HighlightProps } from './highlight.markup';

const meta: Meta<HighlightProps> = { title: 'Molecules/Highlight', render: localized(highlight, (c) => c.home.crow) };
export default meta;

export const Highlight: StoryObj<HighlightProps> = {};
