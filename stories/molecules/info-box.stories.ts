import type { Meta, StoryObj } from '@storybook/html-vite';
import { infoBox, type InfoBoxProps } from './info-box.markup';

const meta: Meta<InfoBoxProps> = {
    title: 'Molecules/Info Box',
    render: (args) => `<div style="max-width:427px">${infoBox(args)}</div>`,
    args: {
        title: 'Interesse an diesem Tier?',
        text: 'Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie gern.',
        links: [
            { label: '0000 000000', href: 'tel:0000000000' },
            { label: 'info@example.org', href: 'mailto:info@example.org' },
        ],
    },
};
export default meta;

export const InfoBox: StoryObj<InfoBoxProps> = {};
