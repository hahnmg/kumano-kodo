# Place Card

Figma: Place Card (7:31). Markup: `stories/molecules/feature-card.markup.ts`.
Fluid: `<kk:featureCard>`.

Photo, title and text for a place.

| Prop                   | Values                                             |
| ---------------------- | -------------------------------------------------- |
| `image`                | `{ src, alt }`                                     |
| `title`, `description` | text                                               |
| `variant`              | `featured` (wide, H3), `default`                   |
| `rule`, `tall`         | a top rule, a taller image (the card below a pair) |

Tokens: `--color-line`, `--color-ink`, `--color-muted`, `--space-10`,
`--space-20`, `--space-24`, `--radius-surface`.
