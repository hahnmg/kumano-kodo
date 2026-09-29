import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { sectionHeading, type SectionHeadingProps } from './section-heading.markup';

const meta: Meta<SectionHeadingProps> = {
    title: 'Molecules/Section Heading',
    argTypes: { variant: { control: 'inline-radio', options: ['default', 'with-aside', 'with-controls'] } },
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
