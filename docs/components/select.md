# Select

Figma: `Select` (84:4583), Multiple No and Yes. Markup: `stories/atoms/select.markup.ts`.

Native select in the underlined field style with a chevron. With `multiple` it is a list box framed by a hairline,
showing `size` rows (default 4) and no chevron; chosen options turn to the accent on the sunk colour.

| Prop | Values |
|---|---|
| `label`, `name` | text |
| `options` | list of labels |
| `value` | selected option, or a list with `multiple` |
| `multiple`, `size` | optional, a list box |
| `description` | optional, as Text Field |
| `required`, `error` | optional, as Text Field |

Tokens: as Text Field, plus `.type-small`.
