import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { ctaCard, type CtaCardProps } from './cta-card.markup';

const card = (p: CtaCardProps) => `<div style="max-width:426px">${ctaCard(p)}</div>`;

const meta: Meta<CtaCardProps> = {
    title: 'Molecules/CTA Card',
    argTypes: { variant: { control: 'inline-radio', options: ['default', 'featured'] } },
    args: { href: '#' },
};
export default meta;

export const Default: StoryObj<CtaCardProps> = {
    args: { variant: 'default' },
    render: localized(card, (c) => ({ ...c.guide.prep[1], linkLabel: c.ui.readMore })),
};
export const Featured: StoryObj<CtaCardProps> = { render: localized(card, (c) => ({ ...c.guide.prep[0], linkLabel: c.ui.readMore })) };
