import type { Meta, StoryObj } from '@storybook/html-vite';
import { infoBox, type InfoBoxProps } from './info-box.markup';

const meta: Meta<InfoBoxProps> = {
    title: 'Molecules/Info Box',
    render: (args) => `<div style="max-width:427px">${infoBox(args)}</div>`,
    args: {
        title: 'Split the stage?',
        text: 'Catch the bus at Hosshinmon and walk only the last 7 km to Hongu.',
        links: [
            { label: 'Bus timetable', href: '#' },
            { label: 'Stay in Chikatsuyu', href: '#' },
        ],
    },
};
export default meta;

export const InfoBox: StoryObj<InfoBoxProps> = {};
