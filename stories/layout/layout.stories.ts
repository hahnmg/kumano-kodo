import type { Meta, StoryObj } from '@storybook/html-vite';
import { grid, rail, section, split, stack } from './layout.markup';

const box = (label: string) =>
    `<div style="padding:24px;border-top:1px solid var(--color-line);color:var(--color-muted)" class="type-label">${label}</div>`;

const meta: Meta = { title: 'Layout/Layout', tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;

export const Grid: StoryObj = {
    render: () =>
        section({
            content: stack([
                grid(
                    [1, 2].map((i) => box(`grid 2 · ${i}`)),
                    2,
                ),
                grid(
                    [1, 2, 3, 4].map((i) => box(`grid 4 · ${i}`)),
                    4,
                ),
            ]),
        }),
};
export const Split: StoryObj = {
    render: () => section({ tone: 'sunk', content: split(box('content 765'), box('sidebar 427'), 'content-sidebar') }),
};
export const Rail: StoryObj = {
    render: () => section({ bleed: true, content: rail([1, 2, 3, 4, 5].map((i) => `<div style="width:420px">${box(`card ${i}`)}</div>`)) }),
};
