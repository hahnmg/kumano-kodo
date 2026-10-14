# Figure

Figma: Figure (7:40). Markup: `stories/molecules/figure.markup.ts`. Fluid:
`<kk:figure>`.

One or two images with a caption under a top rule. `rule: false` drops the rule
where the figure opens a content column (detail page).

| Prop      | Values                     |
| --------- | -------------------------- |
| `images`  | one or two `{ src, alt }`  |
| `caption` | text                       |
| `rule`    | top hairline, default true |

Tokens: `--color-line`, `--color-muted`, `--space-14`, `--space-20`,
`--space-24`.
