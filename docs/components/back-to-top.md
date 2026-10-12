# Back To Top

Figma: not yet drawn. Markup: `stories/atoms/back-to-top.markup.ts`. Script: `src/scripts/back-to-top.ts`.

Round button fixed at the bottom right, rendered by the site footer. It shows once the page is scrolled past one screen; a
click scrolls to the top (instantly with reduced motion) and moves focus to the first link of the page.

| Prop      | Values                                  |
| --------- | --------------------------------------- |
| `label`   | accessible name, default "Back to top" |
| `visible` | shown without scrolling, default false  |

Tokens: `--color-line`, `--color-ink`, `--color-paper`, `--color-accent`, `--radius-full`, `--gutter`, `--space-24`.
