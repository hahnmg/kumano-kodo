# Choice Group

Figma: Choice Group (84:4516), Type Radio and Checkbox, State Default and
Invalid. Markup: `stories/molecules/choice-group.markup.ts`.

RadioButton and MultiCheckbox of EXT:form: a fieldset whose legend, set like a
field label, names the group, with one choice per line. Checkboxes send a list
(`name[]`). An error marks the first choice with `aria-invalid` and shows below,
as on every field.

| Prop                   | Values                        |
| ---------------------- | ----------------------------- |
| `legend`, `name`       | text                          |
| `type`                 | `radio` (default), `checkbox` |
| `options`              | `{ label, value, checked? }`  |
| `error`, `description` | optional, as Text Field       |

Tokens: `--space-10`, `--space-12`, `--color-ink`.
