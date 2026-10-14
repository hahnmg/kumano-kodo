# Checkbox

Figma: `Checkbox` (65:227), variants Default and Invalid. Markup:
`stories/atoms/checkbox.markup.ts`. Defines the shared `.choice` styles used by
Radio.

Native checkbox in the accent colour with a muted caption label.

| Prop                  | Values                                                        |
| --------------------- | ------------------------------------------------------------- |
| `label`, `name`       | text                                                          |
| `checked`, `required` | boolean                                                       |
| `error`               | optional; the message is grouped with the box below its label |

Tokens: `--color-accent`, `--color-muted`, `--space-4`, `--space-12`,
`.type-caption`.
