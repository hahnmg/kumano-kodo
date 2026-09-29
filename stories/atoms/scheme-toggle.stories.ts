import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { schemeToggle, type SchemeToggleProps } from './scheme-toggle.markup';

const meta: Meta<SchemeToggleProps> = { title: 'Atoms/Scheme Toggle', render: localized(schemeToggle, (c) => ({ label: c.ui.darkMode })) };
export default meta;

export const Off: StoryObj<SchemeToggleProps> = { args: { pressed: false } };
export const On: StoryObj<SchemeToggleProps> = { args: { pressed: true } };
