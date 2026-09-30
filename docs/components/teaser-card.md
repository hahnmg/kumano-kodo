# Teaser Card

Figma: Teaser Card (29:189). Markup: `stories/molecules/teaser-card.markup.ts`.

Generic teaser (animal, product, article): square image, linked title, subtitle, meta and optional badge. The whole card is clickable.

| Prop | Values |
|---|---|
| `image` | `{ src, alt }` |
| `title`, `href` | text, URL |
| `subtitle`, `meta`, `badge` | optional |
| `level` | heading level 2 or 3, or `'none'` for a paragraph title inside navigation; default 3 |

Tokens: `--color-hair`, `--color-ink`, `--color-muted`, `--space-4`, `--space-12`, `--space-14`, `--space-20`.
