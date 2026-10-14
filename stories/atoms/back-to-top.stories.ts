import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { backToTop, type BackToTopProps } from './back-to-top.markup';

const meta: Meta<BackToTopProps> = {
  title: 'Atoms/Back To Top',
  render: localized(backToTop, (c) => ({ label: c.ui.backToTop, visible: true })),
};
export default meta;

export const BackToTop: StoryObj<BackToTopProps> = {};
