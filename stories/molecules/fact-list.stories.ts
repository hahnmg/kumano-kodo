import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { factList, type FactListProps } from './fact-list.markup';
import { choice } from '../templates/controls';

const meta: Meta<FactListProps> = {
    title: 'Molecules/Fact List',
    render: localized(
        (p: FactListProps) => `<div style="max-width:427px">${factList(p)}</div>`,
        (c) => ({ title: c.pages.detail.factsTitle, facts: c.pages.detail.facts }),
    ),
    argTypes: { layout: choice<NonNullable<FactListProps['layout']>>()('inline', 'stacked') },
};
export default meta;

export const Inline: StoryObj<FactListProps> = { args: { layout: 'inline' } };
export const Stacked: StoryObj<FactListProps> = { args: { layout: 'stacked' } };
