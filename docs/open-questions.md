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

Nothing decided is waiting to be built.

## Decisions

### 2026-10-14

- **Hero slider, done**: the photo hero takes up to four further slides, each
  with photo, eyebrow, title, text and button; it moves on every seven seconds
  until paused, sideways, and starts paused for reduced motion.

- **Base theme, done**: Route map and Chapter moved into the demo package with
  the set `kumano-kodo/demo` and the components `kkd:`; see
  `docs/adr/2026-10-14-base-theme.md`.

- **Theme effects (question 13), done**: the gradients, glow and triple rule it
  listed left with v3; the code keeps only Violet's capitals and +0.09em on the
  display face. Figma has them as the text styles `Violet/…`, used by Kumano
  Home · Violet.

- **Place Card `Ruled` (question 10), done**: one `Default` card with the switch
  Rule and the image axis Tall, in Figma and code (`rule`, `tall`); the editors'
  choice Ruled stays and sets both.

- **Hero gradient (question 6), done**: its three stops are the variables
  `scrim/top`, `scrim/middle` and `scrim/bottom` in Figma and code.

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
