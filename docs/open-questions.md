# Open questions

Nothing is open without an owner. Decisions are added below with their date;
earlier ones stay.

## Waiting

| Topic                                                                                 | Waiting for                                                            | Until then                            |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------- |
| Themes that differ more (colour, type, header, vertical rhythm, type on large images) | Annett's direction                                                     | Nothing is built                      |
| Japanese texts checked by a native speaker                                            | Alexander finds reviewers; a table of every Japanese text goes to them | Known problem in the manual           |
| A real YouTube clip for Atoms › Video › External                                      | Alexander                                                              | The story keeps a placeholder id      |
| Core content elements without fluid_styled_content                                    | What TYPO3 v15's core does                                             | Kumano renders its own elements only  |
| npm audit (braces, source-map-js, development only)                                   | Dependabot                                                             | No manual upgrade                     |
| Containers (b13/container) in the core theme                                          | Alexander with Benni Mack                                              | Untouched; nothing new builds on them |
| Japanese web font: bundle Noto Sans JP or use system fonts                            | Alexander                                                              | Runtime download stays                |
| Photo licence: CC BY 4.0, GPL or CC0                                                  | Alexander                                                              | CC BY 4.0                             |

## Decided, to do

Nothing decided is waiting to be built.

## Decisions

### 2026-11-26

- **Core readiness** (epic #111554): the extension is `typo3/theme-kumano-kodo`,
  key `theme_kumano_kodo`, as Camino; CTypes `kumano_*` and settings
  `kumanoKodo.*` stay. Type stays `typo3-cms-extension` until the containers are
  gone.
- **News**: the set moved to `kumano-kodo/theme-extras`; the demo's trail
  reports are pages built from elements, at `/reports` and `/reports/<slug>`.
- **EXT:form**: not required; without it only the demo cannot be created.
- **Visual Editor**: texts render through `f:render.text`; component text
  arguments take `string|UnsafeHTML`; components whose text sat in a `<p>` take
  blocks. `friendsoftypo3/visual-editor` is a development dependency only.

### 2026-10-15

- **One extension, done**: Kumano Kodo is the extension `kumano-kodo/theme` with
  the sets theme, news, journal and demo; the demo and the starter are created
  by command or backend module. See `docs/adr/2026-10-15-one-extension.md`.

### 2026-10-14

- **Content showcase, done**: Practical › Content showcase shows every element
  in each of its variants, plugins included, with the element's name above each
  block. Hero, slides, opener and the page-top columns stay on their own pages,
  since each sets the h1. Its table of contents is the new list variant Links in
  columns, which groups the entries by their label.

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
