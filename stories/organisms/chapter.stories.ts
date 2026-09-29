import type { Meta, StoryObj } from '@storybook/html-vite';
import { content } from '../templates/content';
import { dayPhotos } from '../templates/journal-photos';
import { chapter } from './chapter.markup';

const meta: Meta = { title: 'Organisms/Chapter', parameters: { layout: 'fullscreen' } };
export default meta;

export const Chapter: StoryObj = {
    render: (_, { globals }) => {
        const { kumano, home, photos, ui } = content(globals.locale);
        return chapter({
            id: 'story-day-1',
            number: '1',
            date: `${kumano.days[0].date} · ${kumano.days[0].time}`,
            title: kumano.days[0].route,
            text: home.draft.chapters[0],
            photos: dayPhotos[0].map(([name, span, shift]) => ({ image: photos[name], span, shift })),
            labels: { close: ui.close, previous: ui.previous, next: ui.next },
        });
    },
};
