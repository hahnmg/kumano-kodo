# Kumano Kodo design system

Components and tokens for the Kumano Kodo sitepackage. **Figma is the design source**; this repository turns it into a
Storybook of plain HTML components.

- Figma: https://www.figma.com/design/p6SK2xN5ZzBisOW1wKlrDm (pages Foundations, Components, Pages)
- Storybook: https://hahnmg.github.io/kumano-kodo/ (deployed from `develop`)

## Run it

```
npm ci
npm run storybook        # http://localhost:6006
```

The toolbar switches **language** (日本語, Deutsch, English) and **scheme** (light, dark). The JA · DE · EN links and the
dark mode button in the site header do the same and keep the toolbar in step. Themes are shown as templates
(Kumano Home · Caramel, Forest, Ocean, Violet); components render in Caramel.

Sample content lives in `stories/content/en.ts`, `de.ts` and `ja.ts`, one object each with the same shape; TypeScript
fails the build if a language misses a key. The Japanese text has not been checked by a native speaker.

The sidebar runs from whole pages to parts: **Site** (every page), **Templates** (the home page in four themes and the v3 home it replaced),
**Organisms**, **Molecules**, **Atoms** ("Atoms/Overview" shows all atoms on one page) and **Layout**. Every component
is one Docs page with all its variants and the controls; single stories are not listed.

| Command             | Does                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| `npm run tokens`    | Generates `src/tokens/tokens.css` from `docs/figma-export/variables.json`             |
| `npm run storybook` | Local Storybook                                                                       |
| `npm run build`     | Tokens, contrast gate, static Storybook in `storybook-static/`                        |
| `npm run lint`      | ESLint, Stylelint (no hex colours in components), lowercase-kebab filenames, Prettier |
| `npm test`          | Component specs with axe in light and dark                                            |
| `npm run size`      | CSS size budget                                                                       |

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

`typo3/` holds a TYPO3 v14 installation with the sitepackage (`packages/kumano_kodo`) and the trail journal as demo
content (`packages/kumano_kodo_demo`). Why it is built this way: `docs/adr/2026-09-30-typo3-sitepackage.md`.

```
ddev start               # installs TYPO3 and imports the demo on the first start
```

The site answers at https://kumano-kodo.ddev.site in EN, `/de/` and `/ja/`; the backend at `/typo3` with user `admin`
and the password the first start prints (also in `typo3/var/admin-password`). The demo holds every Storybook site page,
the previous home (`/home-v3`) and a page with the remaining components (`/components`).

- **Site settings** (Sites › Setup › Settings): theme, colour mode, dark mode toggle, site name, contact, the 18 palette
  colours, three typefaces (Google Fonts, served from this server), display weight, spacing unit, page margin, section
  spacing, content width and radii. Empty fields and colours left at their default keep the theme's value.
- **Logo**: Caramel shows the classic mark, the other themes the modern one; an editor can upload another on the home
  page (tab Appearance). An SVG takes the theme colours when its groups are named `bird` and `text`.
- **Content**: containers **Section** and **Columns** for layout, 13 content elements with a display option each
  (Cards, List, Facts, Images …). Top bar and footer texts are content elements on the home page. Why:
  `docs/adr/2026-09-30-typo3-content-model.md`.

| Command                                                 | Does                                                                    |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `npm run build:typo3`                                   | CSS, scripts, generated partials and labels into the sitepackage        |
| `npm run export:demo`                                   | Demo pages and texts from the Storybook content into `typo3/Build/Demo` |
| `ddev exec -d /var/www/html/typo3 composer demo:export` | Rebuilds the demo records and exports them as the demo's `data.xml`     |

## Photos

The 27 trip photos live as originals in `img/original` on the maintainer's machine only; that folder is not in git
(about 400 MB). `npm run images` builds the web versions into `img/photos`: 640, 1200 and 2400 px, rotated upright,
sRGB, all metadata including GPS removed. It also writes `stories/content/photos.json` with size and capture time,
which the captions use. The web versions and the manifest are committed. The older files directly in `img/` belong to
the archived v3 export only.

## Where things are

| Path                                   | Content                                                     |
| -------------------------------------- | ----------------------------------------------------------- |
| `docs/adr/`                            | Decisions, newest last                                      |
| `docs/open-questions.md`               | Open decisions with proposal and impact                     |
| `docs/figma-map.json`                  | Figma node of each component                                |
| `src/`                                 | Generated tokens, base styles, HTML helpers                 |
| `scripts/`                             | Token build and gates                                       |
| `img/`                                 | Photos used in stories                                      |
| `original/`, `sections/`, `index.html` | The v3 Claude Design export the design started from         |
| `docs/paper-snapshot/`                 | Record of the intermediate Paper version, no longer updated |
