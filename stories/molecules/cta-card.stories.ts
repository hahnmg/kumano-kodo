import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo } from '../templates/content';
import { ctaCard, type CtaCardProps } from './cta-card.markup';

const meta: Meta<CtaCardProps> = {
    title: 'Molecules/CTA Card',
    tags: ['autodocs'],
    render: (args) => `<div style="max-width:426px">${ctaCard(args)}</div>`,
    argTypes: { variant: { control: 'inline-radio', options: ['default', 'featured'] } },
    args: { linkLabel: 'Mehr erfahren', href: '#' },
};
export default meta;

export const Default: StoryObj<CtaCardProps> = { args: { ...demo.help[1], variant: 'default' } };
export const Featured: StoryObj<CtaCardProps> = { args: demo.help[0] };
