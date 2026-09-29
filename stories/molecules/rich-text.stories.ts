import type { Meta, StoryObj } from '@storybook/html-vite';
import { richTextSample } from '../templates/content';
import { richText, type RichTextProps } from './rich-text.markup';

const meta: Meta<RichTextProps> = { title: 'Molecules/Rich Text', render: (args) => richText(args), args: { html: richTextSample } };
export default meta;

export const RichText: StoryObj<RichTextProps> = {};
