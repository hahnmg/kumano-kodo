import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { personCard, type PersonCardProps } from './person-card.markup';

const meta: Meta<PersonCardProps> = {
  title: 'Molecules/Person Card',
  render: localized(
    (p: PersonCardProps) => `<div style="max-width:240px">${personCard(p)}</div>`,
    (c) => c.guide.hosts[0],
  ),
};
export default meta;

export const PersonCard: StoryObj<PersonCardProps> = {};
