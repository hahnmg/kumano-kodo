# File Upload

Figma: not yet drawn. Markup: `stories/atoms/file-upload.markup.ts`. Script: `src/scripts/file-upload.ts`.

FileUpload and ImageUpload of EXT:form as a drop zone: a dashed face with "Drag a file here or choose one". The file
input lies invisibly in the same grid cell, so a click or a drop on the face reaches it without a script; the script
only marks the zone while a file is dragged over it and names the chosen files. Uploaded files (from an earlier step)
follow as a list, each with a box to remove it.

| Prop | Values |
|---|---|
| `label`, `name`, `dropLabel`, `chooseLabel` | text |
| `accept`, `multiple`, `required` | as the native input |
| `files`, `removeLabel` | uploaded files and the label of their remove box |
| `error`, `description` | optional, as Text Field |

Tokens: `--color-line`, `--color-ink`, `--color-sunk`, `--color-muted`, `--color-accent`, `--space-8`, `--space-10`, `--space-20`, `--space-28`.
