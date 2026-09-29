import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconNames } from '../atoms/icon.markup';
import { guide } from '../templates/content';
import { iconFact, type IconFactProps } from './icon-fact.markup';

const meta: Meta<IconFactProps> = {
    title: 'Molecules/Icon Fact',
    render: (args) => `<div style="max-width:300px">${iconFact(args)}</div>`,
    argTypes: { icon: { control: 'select', options: iconNames } },
    args: guide.facts[0],
};
export default meta;

export const IconFact: StoryObj<IconFactProps> = {};
