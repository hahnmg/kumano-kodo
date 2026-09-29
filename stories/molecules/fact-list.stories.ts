import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { factList, type FactListProps } from './fact-list.markup';

const meta: Meta<FactListProps> = {
    title: 'Molecules/Fact List',
    render: localized(
        (p: FactListProps) => `<div style="max-width:427px">${factList(p)}</div>`,
        (c) => ({ title: c.pages.detail.factsTitle, facts: c.pages.detail.facts }),
    ),
    argTypes: { layout: { control: 'inline-radio', options: ['inline', 'stacked'] } },
};
export default meta;

export const Inline: StoryObj<FactListProps> = { args: { layout: 'inline' } };
export const Stacked: StoryObj<FactListProps> = { args: { layout: 'stacked' } };
