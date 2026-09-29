import type { Meta, StoryObj } from '@storybook/html-vite';
import { factList, type FactListProps } from './fact-list.markup';

const facts = [
    { label: 'Gefunden am', value: '28.07.2026' },
    { label: 'Fundort', value: 'Musterstadt, Beispielstraße' },
];

const meta: Meta<FactListProps> = {
    title: 'Molecules/Fact List',
    tags: ['autodocs'],
    render: (args) => `<div style="max-width:427px">${factList(args)}</div>`,
    argTypes: { layout: { control: 'inline-radio', options: ['inline', 'stacked'] } },
    args: { title: 'Steckbrief', facts },
};
export default meta;

export const Inline: StoryObj<FactListProps> = { args: { layout: 'inline' } };
export const Stacked: StoryObj<FactListProps> = { args: { layout: 'stacked' } };
