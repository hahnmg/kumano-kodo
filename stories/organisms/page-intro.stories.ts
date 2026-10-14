import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { pageIntro, type JournalOpenerProps } from './page-intro.markup';

const meta: Meta<JournalOpenerProps> = {
  title: 'Organisms/Page Intro',
  render: localized(pageIntro, ({ home, kumano }) => ({
    kicker: home.draft.kicker,
    title: home.draft.title,
    lede: home.draft.lede,
    meta: `${kumano.hero.eyebrow} · ${home.draft.allPhotos}`,
    vertical: '熊野古道',
  })),
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const PageIntro: StoryObj<JournalOpenerProps> = {};
