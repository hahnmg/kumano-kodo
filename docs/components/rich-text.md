# Rich Text

Figma: Rich Text (19:178). Markup: `stories/molecules/rich-text.markup.ts`.

Editorial HTML from the CMS (h2, h3, p, lists, links). The content is trusted and not escaped; styles use the `--type-*` variables because CMS markup carries no classes.

| Prop | Values |
|---|---|
| `html` | trusted HTML |

Tokens: `--type-h3-*`, `--type-h4-*`, `--type-body-*`, `--color-accent`, `--space-20`.
