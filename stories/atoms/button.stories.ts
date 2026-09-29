import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { button, type ButtonProps } from './button.markup';

const onImage = { backgrounds: { disable: true } };
const photo = (html: string) =>
    `<div style="padding:40px;background:url(img/photos/sea-of-clouds-1200.jpg) center/cover;display:inline-flex;gap:12px">${html}</div>`;

const meta: Meta<ButtonProps> = {
    title: 'Atoms/Button',
    render: localized(button, (c) => ({ label: c.ui.subscribe })),
    argTypes: { variant: { control: 'inline-radio', options: ['primary', 'light', 'outline'] } },
};
export default meta;

export const Primary: StoryObj<ButtonProps> = { args: { variant: 'primary' } };
export const Light: StoryObj<ButtonProps> = {
    args: { variant: 'light' },
    render: localized(
        (p: ButtonProps) => photo(button(p)),
        (c) => ({ label: c.kumano.hero.actions[0].label }),
    ),
    parameters: onImage,
};
export const Outline: StoryObj<ButtonProps> = {
    args: { variant: 'outline' },
    render: localized(
        (p: ButtonProps) => photo(button(p)),
        (c) => ({ label: c.kumano.hero.actions[1].label }),
    ),
    parameters: onImage,
};
