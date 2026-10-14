# Form

Figma: Form (66:393), states Default, Invalid, Sent, Step (page 2 of the demo's
form) and Summary. Markup: `stories/molecules/form.markup.ts`, the demo's form
with every element type in `stories/templates/walk-form.ts`.

The frame EXT:form renders into: the fields in one column, the note on required
fields, the buttons. Fields are the field atoms; an invalid one keeps its rule
in the accent and names the problem below it (`error` prop). At most 640px wide.

| Prop               | Values                                                                      |
| ------------------ | --------------------------------------------------------------------------- |
| `action`, `submit` | text                                                                        |
| `fields`           | rendered fields in order                                                    |
| `note`             | optional, for example "Fields marked * are required."                       |
| `steps`            | optional, a form over several pages: `{ label, names, current }`            |
| `previous`         | optional, the label of the way back, a Secondary button before the main one |

Parts for EXT:form's other element types, in the same file:

| Part           | EXT:form element    | Shape                                                                                             |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| `formSteps`    | the form's pages    | numbered list above the fields, the current step (`aria-current="step"`) in the accent; not links |
| `formFieldset` | Fieldset            | its fields under a legend set as an H4                                                            |
| `formRow`      | GridRow, GridColumn | columns side by side in equal widths, stacked below 600px                                         |
| `formText`     | StaticText          | an H4 and the text in muted                                                                       |
| `formSummary`  | SummaryPage         | each page's label as an H4, then one row per answer, label left and value right                   |

Every other type maps to an atom: Text, Email, Telephone, Url, Number, Date,
DatePicker, Password and AdvancedPassword to Text Field; SingleSelect,
CountrySelect and MultiSelect to Select; Textarea; Checkbox; RadioButton and
MultiCheckbox to Choice Group; FileUpload and ImageUpload to File Upload. A
ContentElement renders the chosen element inside the form without its section
spacing. Hidden and Honeypot render nothing to see.

Tokens: `--space-8`, `--space-12`, `--space-14`, `--space-16`, `--space-24`,
`--color-muted`, `--color-ink`, `--color-line`, `--color-accent`,
`--radius-full`.

Sent: EXT:form's confirmation replaces the form and renders as an Info Box, the
title from the theme, the text from the form's confirmation finisher
(`Resources/Private/Extensions/Form/Templates/Finishers/Confirmation/`).
