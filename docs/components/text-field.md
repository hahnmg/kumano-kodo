# Text Field

Figma: `Text Field` (65:214), variants Default and Invalid. Markup: `stories/atoms/text-field.markup.ts`. Defines the shared `.field` styles used by Select, Search Field and Textarea.

Label above an underlined input.

| Prop                                               | Values                                                                                    |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `label`, `name`                                    | text                                                                                      |
| `type`                                             | `text`, `email`, `tel`, `url`, `number`, `date`, `password`                              |
| `value`, `placeholder`, `required`, `autocomplete` | optional                                                                                  |
| `error`                                            | message; marks the field invalid, ties the message to the control with `aria-describedby` |

An invalid field (also Select, Textarea, Checkbox) keeps its rule in `--color-accent` and shows the message with the alert icon below.

A `description` shows below the field (and below an error) and is tied to the control with `aria-describedby`; `min` and
`max` limit a number or date.

Tokens: `--color-muted`, `--color-hair`, `--color-ink`, `--space-10`, `.type-label`, `.type-lead`.

Focus: a 2px accent frame over the field box (`.field-box`), flush with its line and 12px wider than the text on both sides; every text field, textarea and select sits in such a box.
