import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { textMedia, type TextMediaProps } from './text-media.markup';
import { choice } from '../templates/controls';

const meta: Meta<TextMediaProps> = {
    title: 'Molecules/Text & Media',
    argTypes: { imageSide: choice<NonNullable<TextMediaProps['imageSide']>>()('left', 'right') },
    render: localized(textMedia, (c) => ({
        image: c.kumano.places[1].image,
        title: c.kumano.places[1].title,
        text: c.kumano.places[1].description,
        link: { label: c.ui.readMore, href: '#' },
    })),
};
export default meta;

export const ImageLeft: StoryObj<TextMediaProps> = { args: { imageSide: 'left' } };
export const ImageRight: StoryObj<TextMediaProps> = { args: { imageSide: 'right' } };

// Several paragraphs: the image stays beside the text while it scrolls.
export const LongText: StoryObj<TextMediaProps> = {
    args: { imageSide: 'left' },
    render: localized(textMedia, (c) => ({
        image: c.kumano.places[1].image,
        title: c.home.draft.title,
        text: c.home.draft.chapters,
        link: { label: c.ui.readMore, href: '#' },
    })),
};
