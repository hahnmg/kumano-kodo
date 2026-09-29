# Site Header

Figma: Site Header (9:18), Nav Item (21:100). Markup: `stories/organisms/site-header.markup.ts`.

Logo, main navigation, theme swatches, languages and the light/dark toggle. The theme buttons carry `data-theme-value` for the site script; Storybook switches themes through its toolbar instead.

| Prop | Values |
|---|---|
| `nav` | `{ label, href, active?, hasChildren? }[]` |
| `languages` | optional `{ code, href, active? }[]` |
| `themes` | show theme swatches, default true |

Tokens: `--color-paper`, `--color-line`, `--color-ink`, `--color-accent`, `--theme-*`, `--gutter`.
