import type { Meta, StoryObj } from '@storybook/html-vite';
import { avatar, type AvatarProps } from './avatar.markup';
import './avatar.css';

const meta: Meta<AvatarProps> = {
    tags: ['autodocs'],
    title: 'Atoms/Avatar',
    render: (args) => avatar(args),
    argTypes: { size: { control: 'inline-radio', options: ['large', 'small'] } },
    args: { src: 'img/zedernweg.jpg', alt: 'Two walkers between tall cedars', size: 'large' },
};
export default meta;

export const Large: StoryObj<AvatarProps> = { args: { size: 'large' } };
export const Small: StoryObj<AvatarProps> = { args: { size: 'small' } };
