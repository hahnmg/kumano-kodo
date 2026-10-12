import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { skipLink, type SkipLinkProps } from './skip-link.markup';

// Hidden until focused: press Tab in the canvas to see it.
const meta: Meta<SkipLinkProps> = { title: 'Atoms/Skip Link', render: localized(skipLink, (c) => ({ label: c.ui.skipToContent })) };
export default meta;

export const SkipLink: StoryObj<SkipLinkProps> = {};
