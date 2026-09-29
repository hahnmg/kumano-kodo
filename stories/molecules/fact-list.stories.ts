import type { Meta, StoryObj } from '@storybook/html-vite';
import { factList, type FactListProps } from './fact-list.markup';

const facts = [
    { label: 'Day', value: 'Day 3 · 15 May' },
    { label: 'Distance', value: '25,9 km' },
    { label: 'Walking time', value: '9:20 h' },
];

const meta: Meta<FactListProps> = {
    title: 'Molecules/Fact List',
    tags: ['autodocs'],
    render: (args) => `<div style="max-width:427px">${factList(args)}</div>`,
    argTypes: { layout: { control: 'inline-radio', options: ['inline', 'stacked'] } },
    args: { title: 'Stage facts', facts },
};
export default meta;

export const Inline: StoryObj<FactListProps> = { args: { layout: 'inline' } };
export const Stacked: StoryObj<FactListProps> = { args: { layout: 'stacked' } };
