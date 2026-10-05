import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { highlight, type HighlightProps } from './highlight.markup';
import { choice } from '../templates/controls';

const meta: Meta<HighlightProps> = {
    title: 'Molecules/Highlight',
    argTypes: { level: choice<NonNullable<HighlightProps['level']>>()(2, 3) },
    render: localized(highlight, (c) => c.home.crow),
};
export default meta;

export const Highlight: StoryObj<HighlightProps> = {};
