# Menu Button

Figma: Menu Button (36:182). Markup: `stories/atoms/menu-button.markup.ts`.
Script: `src/scripts/menu-toggle.ts`.

Opens the folded navigation below 900px. Two hairlines that cross when open; the
script sets `aria-expanded` and closes the menu on Escape. The site header shows
it only on narrow screens.

| Prop       | Values                          |
| ---------- | ------------------------------- |
| `label`    | accessible name, default "Menu" |
| `expanded` | initial state, default false    |

Tokens: `--color-line`, `--color-ink`, `--color-accent`, `--radius-full`,
`--motion-*`.
