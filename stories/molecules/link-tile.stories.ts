import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconNames } from '../atoms/icon.markup';
import { localized } from '../templates/content';
import { linkTile, type LinkTileProps } from './link-tile.markup';

const meta: Meta<LinkTileProps> = {
    title: 'Molecules/Link Tile',
    render: localized(
        (p: LinkTileProps) => `<div style="max-width:640px">${linkTile(p)}</div>`,
        (c) => c.guide.tiles[0],
    ),
    argTypes: { icon: { control: 'select', options: iconNames } },
    args: { href: '#' },
};
export default meta;

export const LinkTile: StoryObj<LinkTileProps> = {};
