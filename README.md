# Kumano Kodo for TYPO3

A theme for TYPO3 and its design system: components and tokens for the Kumano Kodo sitepackage. **Figma is the design
source**; this repository turns it into a Storybook of plain HTML components.

This README is for those who build Kumano Kodo. Who uses the TYPO3 packages reads the manual in
`typo3/packages/kumano_kodo/Documentation/`.

- Figma: https://www.figma.com/design/p6SK2xN5ZzBisOW1wKlrDm (pages Foundations, Components, Pages)
- Storybook: https://hahnmg.github.io/kumano-kodo/ (deployed from `develop`)
- Manual for users of the TYPO3 packages: https://hahnmg.github.io/kumano-kodo/manual/Index.html (`npm run docs` renders it
  locally into `typo3/packages/kumano_kodo/Documentation-GENERATED-temp/`)

## Run it

```
npm ci
npm run storybook        # http://localhost:6006
```

Storybook's own look is the theme Mono. Its sidebar shows the official TYPO3 logo
(`.storybook/typo3-logo.svg`, from `typo3/cms-core`), used with the TYPO3 Association's permission.

The toolbar switches **language** (日本語, Deutsch, English) and **scheme** (light, dark). The JA · DE · EN links and the
dark mode button in the site header do the same and keep the toolbar in step. Themes are shown as templates
(Kumano Home · Caramel, Forest, Ocean, Violet, Mono, and the starter set in Mono); components render in Caramel.

Sample content lives in `stories/content/en.ts`, `de.ts` and `ja.ts`, one object each with the same shape; TypeScript
fails the build if a language misses a key. The Japanese text has not been checked by a native speaker.

The sidebar runs from whole pages to parts: **Site** (every page), **Templates** (the home page in five themes and the starter set),
**Organisms**, **Molecules**, **Atoms** ("Atoms/Overview" shows all atoms on one page) and **Layout**. Every component
is one Docs page with all its variants and the controls; single stories are not listed.

| Command             | Does                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm run tokens`    | Generates `src/tokens/tokens.css` from `docs/figma-export/variables.json`                                        |
| `npm run storybook` | Local Storybook                                                                                                  |
| `npm run build`     | Tokens, contrast gate, static Storybook in `storybook-static/`                                                   |
| `npm run lint`      | ESLint, Stylelint (no hex colours in components), lowercase-kebab filenames, one tag per line in Fluid, Prettier |
| `npm test`          | Component specs with axe in light and dark                                                                       |
| `npm run size`      | CSS size budget                                                                                                  |

All four gates (`build`, `lint`, `size`, `test`) must pass before a merge; the Pages workflow runs them too.

## How a change travels

1. **Change it in Figma.** Colours, spacing, radii and fonts are variables; components are Figma components with
   variants and text properties.
2. **Tokens:** export the variables into `docs/figma-export/variables.json` (an agent does this via the Figma MCP), then
   `npm run tokens`.
3. **Components:** an agent reads the changed Figma component and updates its files. There is no automatic sync.

Each component has four files and nothing else holds its markup:

```
docs/components/<name>.md            definition: purpose, props, tokens, Figma node
stories/<group>/<name>.markup.ts     the markup builder, the only copy of the HTML
stories/<group>/<name>.css           styles, tokens only
stories/<group>/<name>.stories.ts    Storybook: one story per variant
tests/components/<name>.spec.ts      structure and accessibility, using the same builder
```

## Hover and motion

Hover follows the same form language as the rest: no boxes, no fills.

- A hairline turns into an accent line drawn from left to right (tiles, list rows, teasers, CTA cards).
- Arrows move a few pixels in their direction; the download icon moves down.
- Teaser images zoom slowly; text links grow an underline; navigation changes colour only, never underlined. The logo does not move.
- Durations and the curve are tokens (`--motion-fast`, `--motion-base`, `--motion-slow`, `--ease-out`), code-only because Figma has no motion variables. With "reduce motion" set in the OS they drop to zero.

## Site

The **Site** group holds every page of the trail journal: home, the route, days and places, one page per day and per
place, practical information with four subpages, photos, newsletter, Kohechi and the legal pages, in three languages.
Links are real paths (`/days/2`, `/places/yunomine`), listed once in `stories/content/paths.ts`. In Storybook a small
router in `.storybook/preview.ts` opens the matching story when a path is clicked and scrolls to `#anchors`; on the real
site the same paths are the page URLs. A test renders every page in every language and fails on any link that points
nowhere.

## TYPO3

`typo3/` is a TYPO3 v14 installation for developing the packages users install; what they do for users is in the
manual, `typo3/packages/kumano_kodo/Documentation/` (docs.typo3.org format). Why it is built this way:
`docs/adr/2026-09-30-typo3-sitepackage.md`, `docs/adr/2026-09-30-typo3-content-model.md`,
`docs/adr/2026-09-30-typo3-content-form.md`.

| Package                                       | Is                                                                         |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| `kumano-kodo/sitepackage` (`kumano_kodo`)     | The theme. Generated parts come from Storybook via `npm run build:typo3`   |
| `kumano-kodo/demo` (`kumano_kodo_demo`)       | The trail journal, built from the Storybook content, and the build command |
| `kumano-kodo/starter` (`kumano_kodo_starter`) | Five placeholder pages; excludes the demo                                  |

```
ddev start               # installs TYPO3 and imports the demo on the first start
```

The site answers at https://kumano-kodo.ddev.site in EN, `/de/` and `/ja/`; the backend at `/typo3` with user `admin`
and the password in `typo3/var/admin-password` (generated once, kept across reinstalls). The demo holds every Storybook
site page, reachable from its menus: the previous home as an overview (`/at-a-glance`), the remaining components
(`/ways-to-walk-it`) and a form with every EXT:form element type (`/register`). The log-in takes the
published walker account `pilgrim` (`stories/content/demo-login.ts`). Set `KUMANO_DEMO=starter` before the first start
(`ddev config --web-environment-add=KUMANO_DEMO=starter`) to build the starter pages instead.

| Command                                                    | Does                                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `npm run build:typo3`                                      | CSS, scripts, generated partials, labels and the manual's settings page               |
| `npm run export:demo`, `npm run export:starter`            | Demo and starter pages and texts from the Storybook content as JSON                   |
| `ddev exec -d /var/www/html/typo3 composer demo:export`    | Rebuilds the demo records and exports them as the demo's `data.xml`                   |
| `ddev exec -d /var/www/html/typo3 composer starter:export` | The same for the starter package, then puts the demo back                             |
| `npm run docs`                                             | Renders the manual (Docker) into the package's `Documentation-GENERATED-temp/`        |
| `npm run docs:feature`                                     | Draws the manual's start image, the start page in each theme (fetches the fonts once) |

- **Imports keep their links**: impexp remaps only the root page of an imported site; the demo's
  `RemapSitePagesOnPackageInitialization` points its error pages and page settings at the imported pages.
- **Lessons from the core theme**: every problem reported for TYPO3's core theme Camino and the solution here, in
  Storybook under "Core theme issues" (data: `docs/core-theme-issues.json`).
- **Fluid components**: everything the theme renders is a component in `Resources/Private/Components`, namespace
  `KumanoKodo\Sitepackage\Components`, so other extensions can use them; `TrimComponentOutput` trims the line breaks
  around each. `npm run build:typo3` writes the reference for the manual and Storybook (`docs/fluid-components.json`).
- **Icons**: drawn to the [TYPO3 Icons](https://typo3.github.io/TYPO3.Icons/guide/drawing.html) grid; the source
  script is not kept, edit the SVGs in `Resources/Public/Icons/Content/`.

## Photos

The 27 trip photos live as originals in `img/original` on the maintainer's machine only; that folder is not in git
(about 400 MB). `npm run images` builds the web versions into `img/photos`: 640, 1200 and 2400 px, rotated upright,
sRGB, all metadata including GPS removed. It also writes `stories/content/photos.json` with size and capture time,
which the captions use. The web versions and the manifest are committed. `img/video/` holds a placeholder clip made from
four of the photos.

## Where things are

| Path                     | Content                                         |
| ------------------------ | ----------------------------------------------- |
| `docs/adr/`              | Decisions, newest last                          |
| `docs/open-questions.md` | Open decisions with proposal and impact         |
| `docs/figma-map.json`    | Figma node of each component                    |
| `src/`                   | Generated tokens, base styles, HTML helpers     |
| `scripts/`               | Token build and gates                           |
| `img/`                   | Photos and the placeholder clip used in stories |
