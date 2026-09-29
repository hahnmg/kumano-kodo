# Site Footer

Figma: Site Footer (9:49). Markup: `stories/organisms/site-footer.markup.ts`.

Wordmark, about text, link columns, optional notice and legal row.

| Prop | Values |
|---|---|
| `wordmark`, `about`, `copyright` | text |
| `columns` | `{ title, links: { label, href? }[] }[]` |
| `notice` | optional Notice props |
| `legal` | `{ label, href }[]` |

Tokens: `--color-ink`, `--color-line`, `--color-muted`, `--color-accent`, `--gutter`, `.type-wordmark`.
