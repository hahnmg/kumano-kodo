# Site Footer

Figma: Site Footer (9:49). Markup: `stories/organisms/site-footer.markup.ts`.

Optional wordmark, about text, link columns, optional notice and legal row. The
wordmark is decoration: in TYPO3 the site setting Website title large in the
footer switches it on.

| Prop                 | Values                                   |
| -------------------- | ---------------------------------------- |
| `wordmark`           | optional text; left out where empty      |
| `about`, `copyright` | text                                     |
| `columns`            | `{ title, links: { label, href? }[] }[]` |
| `notice`             | optional Notice props                    |
| `legal`              | `{ label, href }[]`                      |

Tokens: `--color-ink`, `--color-line`, `--color-muted`, `--color-accent`,
`--gutter`, `.type-wordmark`.
