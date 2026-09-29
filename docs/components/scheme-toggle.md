# Scheme Toggle

Figma: Scheme Toggle (36:173). Markup: `stories/atoms/scheme-toggle.markup.ts`. Script: `src/scripts/scheme-toggle.ts`.

Dark mode switch in the site header, a pressed-state button. The script flips `data-scheme` on `<html>` and keeps
`aria-pressed` on every toggle in step.

| Prop      | Values                               |
| --------- | ------------------------------------ |
| `label`   | accessible name, default "Dark mode" |
| `pressed` | initial state, default false         |

Tokens: `--color-line`, `--color-ink`, `--color-accent`, `--radius-full`, `--motion-fast`.
