import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { avatar, type AvatarProps } from './avatar.markup';

const meta: Meta<AvatarProps> = {
    title: 'Atoms/Avatar',
    render: localized(avatar, (c) => c.photos['stone-path-walkers']),
    argTypes: { size: { control: 'inline-radio', options: ['large', 'small'] } },
};
export default meta;

export const Large: StoryObj<AvatarProps> = { args: { size: 'large' } };
export const Small: StoryObj<AvatarProps> = { args: { size: 'small' } };
