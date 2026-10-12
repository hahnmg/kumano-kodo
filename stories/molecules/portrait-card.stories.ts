import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { portraitCard, type StageCardProps } from './portrait-card.markup';

const meta: Meta<StageCardProps> = { title: 'Molecules/Portrait Card', render: localized(portraitCard, (c) => c.kumano.stages[0]) };
export default meta;

export const PortraitCard: StoryObj<StageCardProps> = {};
