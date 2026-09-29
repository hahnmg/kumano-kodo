import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { journalOpener, type JournalOpenerProps } from './journal-opener.markup';

const meta: Meta<JournalOpenerProps> = {
    title: 'Organisms/Journal Opener',
    render: localized(journalOpener, ({ home, kumano }) => ({
        kicker: home.draft.kicker,
        title: home.draft.title,
        lede: home.draft.lede,
        meta: `${kumano.hero.eyebrow} · ${home.draft.allPhotos}`,
        vertical: '熊野古道',
    })),
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const JournalOpener: StoryObj<JournalOpenerProps> = {};
