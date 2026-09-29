import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { stat, type StatProps } from './stat.markup';

const onImage = (html: string) => `<div style="padding:40px;background:url(img/nebelberge.jpg) center/cover">${html}</div>`;

const meta: Meta<StatProps> = {
    title: 'Molecules/Stat',
    argTypes: { variant: { control: 'inline-radio', options: ['large', 'on-image'] } },
};
export default meta;

export const Large: StoryObj<StatProps> = { args: { variant: 'large' }, render: localized(stat, (c) => c.kumano.stats[0]) };
export const OnImage: StoryObj<StatProps> = {
    args: { variant: 'on-image' },
    render: localized(
        (p: StatProps) => onImage(stat(p)),
        (c) => c.kumano.hero.stats[0],
    ),
};
