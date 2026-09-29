# Site Header

Figma: Site Header (9:18), Nav Item (21:100). Markup: `stories/organisms/site-header.markup.ts`.

Logo, main navigation, languages and the dark mode toggle. The toggle is a pressed-state button; `src/scripts/scheme-toggle.ts`
switches `data-scheme` on `<html>` and keeps `aria-pressed` in step. Language links carry `lang`, `hreflang` and
`data-locale`; in Storybook they switch the story language.

| Prop        | Values                                                                     |
| ----------- | -------------------------------------------------------------------------- |
| `nav`       | `{ label, href, active?, hasChildren? }[]`                                 |
| `languages` | optional `{ code, locale, href, active? }[]`                               |
| `labels`    | optional `{ nav, languages, scheme }` accessible names, English by default |

Tokens: `--color-paper`, `--color-line`, `--color-ink`, `--color-accent`, `--gutter`, `--motion-fast`.
