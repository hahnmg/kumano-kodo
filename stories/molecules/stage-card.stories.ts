import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { stageCard, type StageCardProps } from './stage-card.markup';

const meta: Meta<StageCardProps> = { title: 'Molecules/Stage Card', render: localized(stageCard, (c) => c.kumano.stages[0]) };
export default meta;

export const StageCard: StoryObj<StageCardProps> = {};
