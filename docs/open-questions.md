# Open questions

Nothing is open without an owner. Decisions are added below with their date;
earlier ones stay.

## Waiting

| Topic                                                                                 | Waiting for                                                            | Until then                           |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| Themes that differ more (colour, type, header, vertical rhythm, type on large images) | Annett's direction                                                     | Nothing is built                     |
| Japanese texts checked by a native speaker                                            | Alexander finds reviewers; a table of every Japanese text goes to them | Known problem in the manual          |
| A real YouTube clip for Atoms › Video › External                                      | Alexander                                                              | The story keeps a placeholder id     |
| Core content elements without fluid_styled_content                                    | What TYPO3 v15's core does                                             | Kumano renders its own elements only |
| npm audit (braces, source-map-js, development only)                                   | Dependabot                                                             | No manual upgrade                    |

## Decided, to do

| Topic                                                  | Decision                                                                                                                         |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Hero gradient (formerly question 6)                    | Becomes a token, in Figma and code                                                                                               |
| Place Card `Ruled` (formerly question 10)              | Merges into `Default`: the top rule and the image ratio become properties                                                        |
| Theme effects Figma cannot show (formerly question 13) | Approximated in Figma as far as it goes; the rest documented per theme in Storybook                                              |
| Hero slider                                            | Planned with a Storybook draft for approval                                                                                      |
| Base theme                                             | The journal's own models (stations, day marks, route map, chapters) move out of the theme into the demo; own plan with migration |

## Decisions

### 2026-10-14

- **Mobile (question 4)**: the coded responsive steps are the reference; no
  390px frames in Figma.
- **v3 leftovers (question 7)**: removed in bf46c28; history stays in git.
- **Section headings (question 8)**: every heading uses Section Heading, as
  built.
- **Quote position (question 12)**: centred in the page, as built.
- **Direction**: Kumano is a base theme, not a travel-journal distribution.
- **Figma**: stays at its current state; no further site pages, no DE or JA
  frames.
- **Duplicate assets**: the demo package keeps its own copies in
  `data.xml.files`, so it imports on its own.
- **Formatting**: TYPO3 core's `.editorconfig` applies as it is; PHP is checked
  with typo3/coding-standards; Markdown and RST wrap at 80 columns.
- **TypeScript**: no type check is added; the README no longer claims the build
  runs one.
