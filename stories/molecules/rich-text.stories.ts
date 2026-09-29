import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { richText, type RichTextProps } from './rich-text.markup';

const meta: Meta<RichTextProps> = { title: 'Molecules/Rich Text', render: localized(richText, (c) => ({ html: c.richTextSample })) };
export default meta;

export const RichText: StoryObj<RichTextProps> = {};
