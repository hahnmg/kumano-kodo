# CTA Card

Figma: CTA Card (18:76). Markup: `stories/molecules/cta-card.markup.ts`. Fluid:
`<kk:ctaCard>`.

Title, text and link under a top rule; `featured` draws the rule in the accent
colour. The whole card takes the link's click, as on the teaser card.

| Prop                                 | Values                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| `title`, `text`, `linkLabel`, `href` | text, URL                                                                                   |
| `variant`                            | `default`, `featured`                                                                       |
| `edge`                               | bar in the accent beside the card instead of the line above; rounds with `--radius-surface` |

Tokens: `--color-line`, `--color-accent`, `--color-ink`, `--color-muted`,
`--space-12`, `--space-24`.
