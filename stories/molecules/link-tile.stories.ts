import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconNames } from '../atoms/icon.markup';
import { linkTile, type LinkTileProps } from './link-tile.markup';

const meta: Meta<LinkTileProps> = {
    title: 'Molecules/Link Tile',
    render: (args) => `<div style="max-width:640px">${linkTile(args)}</div>`,
    argTypes: { icon: { control: 'select', options: iconNames } },
    args: { title: 'Getting there and buses', href: '#', icon: 'map-pin' },
};
export default meta;

export const LinkTile: StoryObj<LinkTileProps> = {};
