# Skip Link

Figma: not drawn; it is only visible on keyboard focus. Markup:
`stories/atoms/skip-link.markup.ts`.

The first element of every page. It stays above the viewport until it receives
keyboard focus, then appears at the top left and jumps to `<main id="main">`
(WCAG 2.4.1).

| Prop     | Values                                       |
| -------- | -------------------------------------------- |
| `label`  | link text, default "Skip to content"         |
| `target` | id of the element to jump to, default `main` |

Tokens: `--color-ink`, `--color-paper`, `--color-accent`, `--space-8`,
`--space-12`, `--space-20`.
