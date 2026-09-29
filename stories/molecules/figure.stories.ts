import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { figure, type FigureProps } from './figure.markup';

const frame = (p: FigureProps) => `<div style="max-width:765px">${figure(p)}</div>`;

const meta: Meta<FigureProps> = { title: 'Molecules/Figure' };
export default meta;

export const Single: StoryObj<FigureProps> = {
    render: localized(frame, (c) => ({ images: [c.photos.steinbruecke], caption: c.home.bridgeCaption })),
};
export const Pair: StoryObj<FigureProps> = {
    render: localized(frame, (c) => ({ images: [c.photos.krabbe, c.photos.nebelbaum], caption: c.home.roadsideCaption })),
};
export const Unruled: StoryObj<FigureProps> = {
    args: { rule: false },
    render: localized(frame, (c) => ({ images: [c.photos.talblick], caption: c.pages.detail.caption })),
};
