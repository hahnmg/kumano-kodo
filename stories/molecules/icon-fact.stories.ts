import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconNames } from '../atoms/icon.markup';
import { localized } from '../templates/content';
import { iconFact, type IconFactProps } from './icon-fact.markup';

const meta: Meta<IconFactProps> = {
  title: 'Molecules/Icon Fact',
  render: localized(
    (p: IconFactProps) => `<div style="max-width:300px">${iconFact(p)}</div>`,
    (c) => c.guide.facts[0],
  ),
  argTypes: { icon: { control: 'select', options: iconNames } },
};
export default meta;

export const IconFact: StoryObj<IconFactProps> = {};
