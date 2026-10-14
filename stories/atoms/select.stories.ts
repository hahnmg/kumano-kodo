import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { select, type SelectProps } from './select.markup';

const meta: Meta<SelectProps> = {
  title: 'Atoms/Select',
  parameters: { usage: '\\bfield-control-(?:select|multiple)\\b' },
  render: localized(
    (p: SelectProps) => `<div style="max-width:320px">${select(p)}</div>`,
    (c) => ({ ...c.pages.list.day, value: c.pages.list.day.options[0] }),
  ),
  args: { name: 'day' },
};
export default meta;

export const Select: StoryObj<SelectProps> = {};
export const Multiple: StoryObj<SelectProps> = {
  args: { name: 'languages', multiple: true },
  render: localized(
    (p: SelectProps) => `<div style="max-width:320px">${select(p)}</div>`,
    (c) => ({ label: c.walkForm.languages, options: c.walkForm.languageOptions, value: c.walkForm.languageOptions.slice(0, 2) }),
  ),
};
