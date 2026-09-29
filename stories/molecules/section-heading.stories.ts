import type { Meta, StoryObj } from '@storybook/html-vite';
import { sectionHeading, type SectionHeadingProps } from './section-heading.markup';

const meta: Meta<SectionHeadingProps> = {
    title: 'Molecules/Section Heading',
    tags: ['autodocs'],
    render: (args) => sectionHeading(args),
    argTypes: { variant: { control: 'inline-radio', options: ['default', 'with-aside', 'with-controls'] } },
    args: { eyebrow: 'Stages', title: 'Five sections you can walk on their own' },
};
export default meta;

export const Default: StoryObj<SectionHeadingProps> = { args: { variant: 'default' } };
export const WithAside: StoryObj<SectionHeadingProps> = {
    args: {
        variant: 'with-aside',
        eyebrow: 'Trail map',
        title: 'Schematic, not to scale',
        aside: 'The order of the stations and the day boundaries are accurate, the geometry is not.',
    },
};
export const WithControls: StoryObj<SectionHeadingProps> = { args: { variant: 'with-controls' } };
export const WithoutEyebrow: StoryObj<SectionHeadingProps> = { args: { eyebrow: undefined, title: 'How the four days went' } };
