# Chapter

Figma: Chapter (61:204). Markup: `stories/organisms/chapter.markup.ts`. Fluid: `<kk:chapter>`.

One day of the trail journal: a large numeral, date, route and a paragraph, then the day's photos in capture order on a
twelve-column grid. Each photo sets its `span` and may be lowered by a `shift` of one or two steps, so the rows do not
line up. Captions carry place, date and time; every photo opens in the lightbox. On phones portraits pair up and
landscapes take the full width.

| Prop                              | Values                                   |
| --------------------------------- | ---------------------------------------- |
| `id`                              | id of the heading, for `aria-labelledby` |
| `number`, `date`, `title`, `text` | text                                     |
| `photos`                          | `{ image, span, shift? }[]`              |
| `labels`                          | lightbox labels                          |

Tokens: `--color-accent`, `--color-ink`, `--color-muted`, `--space-*`, `--section-sm`, `.type-hero`, `.type-h3`, `.type-lead`, `.type-caption`.
