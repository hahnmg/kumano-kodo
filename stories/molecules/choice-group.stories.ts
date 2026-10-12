import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { choiceGroup, type ChoiceGroupProps } from './choice-group.markup';
import { choice } from '../templates/controls';

const meta: Meta<ChoiceGroupProps> = {
    title: 'Molecules/Choice Group',
    argTypes: { type: choice<NonNullable<ChoiceGroupProps['type']>>()('radio', 'checkbox') },
};
export default meta;

const render = localized(
    (p: ChoiceGroupProps) => `<div style="max-width:539px">${choiceGroup(p)}</div>`,
    (c) => ({ legend: c.walkForm.route, options: c.walkForm.routes.map((r, i) => ({ label: r, value: String(i), checked: i === 0 })) }),
);

export const Radio: StoryObj<ChoiceGroupProps> = { args: { name: 'route', type: 'radio' }, render };
export const Checkboxes: StoryObj<ChoiceGroupProps> = {
    args: { name: 'interests', type: 'checkbox' },
    render: localized(
        (p: ChoiceGroupProps) => `<div style="max-width:539px">${choiceGroup(p)}</div>`,
        (c) => ({ legend: c.walkForm.interests, options: c.walkForm.interestOptions.map((o, i) => ({ label: o, value: String(i) })) }),
    ),
};
export const Invalid: StoryObj<ChoiceGroupProps> = {
    args: { name: 'route', type: 'radio' },
    render: localized(
        (p: ChoiceGroupProps) => `<div style="max-width:539px">${choiceGroup(p)}</div>`,
        (c) => ({
            legend: `${c.walkForm.route} *`,
            options: c.walkForm.routes.map((r, i) => ({ label: r, value: String(i) })),
            error: c.ui.fieldRequired,
        }),
    ),
};
