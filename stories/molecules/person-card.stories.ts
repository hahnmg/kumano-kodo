import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo } from '../templates/content';
import { personCard, type PersonCardProps } from './person-card.markup';

const meta: Meta<PersonCardProps> = {
    title: 'Molecules/Person Card',
    render: (args) => `<div style="max-width:240px">${personCard(args)}</div>`,
    args: demo.team[0],
};
export default meta;

export const PersonCard: StoryObj<PersonCardProps> = {};
