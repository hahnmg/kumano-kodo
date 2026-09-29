import type { Meta, StoryObj } from '@storybook/html-vite';
import { avatar, type AvatarProps } from './avatar.markup';
import './avatar.css';

const meta: Meta<AvatarProps> = {
    title: 'Atoms/Avatar',
    render: (args) => avatar(args),
    argTypes: { size: { control: 'inline-radio', options: ['large', 'small'] } },
    args: { src: '/img/zedernweg.jpg', alt: 'Dennis Kral', size: 'large' },
};
export default meta;

export const Playground: StoryObj<AvatarProps> = {};
export const Large: StoryObj<AvatarProps> = { args: { size: 'large' } };
export const Small: StoryObj<AvatarProps> = { args: { size: 'small' } };
