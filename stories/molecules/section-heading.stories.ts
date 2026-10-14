import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { sectionHeading, type SectionHeadingProps } from './section-heading.markup';
import { choice } from '../templates/controls';

const meta: Meta<SectionHeadingProps> = {
  title: 'Molecules/Section Heading',
  argTypes: {
    variant: choice<NonNullable<SectionHeadingProps['variant']>>()('default', 'with-aside', 'with-controls'),
    level: choice<NonNullable<SectionHeadingProps['level']>>()(1, 2),
  },
};
export default meta;

export const Default: StoryObj<SectionHeadingProps> = {
  args: { variant: 'default' },
  render: localized(sectionHeading, (c) => c.home.stages),
};
export const WithAside: StoryObj<SectionHeadingProps> = {
  args: { variant: 'with-aside' },
  render: localized(sectionHeading, (c) => c.home.map),
};
export const WithControls: StoryObj<SectionHeadingProps> = {
  args: { variant: 'with-controls' },
  render: localized(sectionHeading, (c) => c.home.stages),
};
export const WithoutEyebrow: StoryObj<SectionHeadingProps> = { render: localized(sectionHeading, (c) => ({ title: c.home.days.title })) };
