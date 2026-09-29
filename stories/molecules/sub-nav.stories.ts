import type { Meta, StoryObj } from '@storybook/html-vite';
import { subNav, type SubNavProps } from './sub-nav.markup';

const meta: Meta<SubNavProps> = {
    title: 'Molecules/Sub Nav',
    render: (args) => `<div style="max-width:290px">${subNav(args)}</div>`,
    args: {
        title: 'Über uns',
        items: [
            { label: 'Unser Team', href: '#', active: true },
            { label: 'Kontakt', href: '#' },
            { label: 'Ihr Weg zu uns', href: '#' },
            { label: 'Jugendgruppe', href: '#' },
            { label: 'Praktikum', href: '#' },
        ],
    },
};
export default meta;

export const SubNav: StoryObj<SubNavProps> = {};
