import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { infoBox, type InfoBoxProps } from './info-box.markup';

const meta: Meta<InfoBoxProps> = {
  title: 'Molecules/Info Box',
  render: localized(
    (p: InfoBoxProps) => `<div style="max-width:427px">${infoBox(p)}</div>`,
    (c) => c.pages.detail.info,
  ),
};
export default meta;

export const InfoBox: StoryObj<InfoBoxProps> = {};
