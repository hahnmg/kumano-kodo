import type { Meta, StoryObj } from '@storybook/html-vite';
import { stat, type StatProps } from './stat.markup';

const onImage = (html: string) => `<div style="padding:40px;background:url(img/nebelberge.jpg) center/cover">${html}</div>`;

const meta: Meta<StatProps> = {
    title: 'Molecules/Stat',
    tags: ['autodocs'],
    render: (args) => stat(args),
    argTypes: { variant: { control: 'inline-radio', options: ['large', 'on-image'] } },
};
export default meta;

export const Large: StoryObj<StatProps> = { args: { value: '68', label: 'kilometres walked', variant: 'large' } };
export const OnImage: StoryObj<StatProps> = {
    args: { value: '68 km', label: 'Distance', variant: 'on-image' },
    render: (args) => onImage(stat(args)),
};
