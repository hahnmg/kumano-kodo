# Layout

Figma: none (page structure). Markup: `stories/layout/layout.markup.ts`.

Section bands and arrangements that templates compose: `section` (tone, space, bleed), `stack`, `grid` (2–4 columns), `split` (fixed ratios from the Figma grid), `rail` (horizontal scroll), `center`, `cluster`. Collapses to one or two columns below 900px until a mobile reference exists.

| Prop | Values |
|---|---|
| `section` | `tone` paper/sunk, `space` default/large/flush-top/none, `bleed`, `label` |
| `split` | ratio content-sidebar, text-media, heading-content, wide-narrow, narrow-wide, even |
| `stack` | gap `heading` (section heading to its content, 56), `elements` (elements in one section, 96), `column` (elements in one column, 40, the default); 16 and 24 only inside a component |

Tokens: `--section-sm`, `--section-lg`, `--gutter`, `--container-page`, `--section-heading-gap`, `--section-element-gap`,
`--column-element-gap`, `--space-*`.
