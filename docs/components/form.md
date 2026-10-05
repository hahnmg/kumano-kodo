# Form

Figma: Form (66:393), states Default, Invalid and Sent. Markup: `stories/molecules/form.markup.ts`.

The frame EXT:form renders into: the fields in one column, the note on required fields, the submit button. Fields are the field atoms; an invalid one keeps its rule in the accent and names the problem below it (`error` prop). At most 640px wide.

| Prop | Values |
|---|---|
| `action`, `submit` | text |
| `fields` | rendered fields in order |
| `note` | optional, for example "Fields marked * are required." |

Tokens: `--space-24`, `--color-muted`.

Sent: EXT:form's confirmation replaces the form and renders as an Info Box, the title from the theme, the text from the form's confirmation finisher (`Resources/Private/Extensions/Form/Templates/Finishers/Confirmation/`).
