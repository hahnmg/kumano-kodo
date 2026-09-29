import type { Meta, StoryObj } from '@storybook/html-vite';
import { button, type ButtonProps } from './button.markup';
import './button.css';

const onImage = { backgrounds: { disable: true } };
const photo = (html: string) =>
    `<div style="padding:40px;background:url(img/nebelberge.jpg) center/cover;display:inline-flex;gap:12px">${html}</div>`;

const meta: Meta<ButtonProps> = {
    title: 'Atoms/Button',
    render: (args) => button(args),
    argTypes: { variant: { control: 'inline-radio', options: ['primary', 'light', 'outline'] } },
    args: { label: 'Subscribe', variant: 'primary' },
};
export default meta;

export const Playground: StoryObj<ButtonProps> = {};
export const Primary: StoryObj<ButtonProps> = { args: { variant: 'primary', label: 'Subscribe' } };
export const Light: StoryObj<ButtonProps> = {
    args: { variant: 'light', label: 'See the stages' },
    render: (args) => photo(button(args)),
    parameters: onImage,
};
export const Outline: StoryObj<ButtonProps> = {
    args: { variant: 'outline', label: 'Practical questions' },
    render: (args) => photo(button(args)),
    parameters: onImage,
};
