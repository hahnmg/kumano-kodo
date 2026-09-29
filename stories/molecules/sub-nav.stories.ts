import type { Meta, StoryObj } from '@storybook/html-vite';
import { subNav, type SubNavProps } from './sub-nav.markup';

const meta: Meta<SubNavProps> = {
    title: 'Molecules/Sub Nav',
    render: (args) => `<div style="max-width:290px">${subNav(args)}</div>`,
    args: {
        title: 'The route',
        items: [
            { label: 'Stage 01 · Takijiri → Takahara', href: '#' },
            { label: 'Stage 02 · Takahara → Chikatsuyu', href: '#' },
            { label: 'Stage 03 · Chikatsuyu → Hongu', href: '#', active: true },
            { label: 'Stage 04 · Koguchi → Nachi', href: '#' },
            { label: 'Optional · Hosshinmon → Hongu', href: '#' },
        ],
    },
};
export default meta;

export const SubNav: StoryObj<SubNavProps> = {};
