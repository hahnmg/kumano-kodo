# Proposal: what Camino taught us

Status: accepted 2026-10-05 with these answers: starter set later (as a choice
inside the demo); all three core extensions; our own guard against
fluid_styled_content now. Built: 1 (starter set as a choice in the demo), 2, 3
(search in the header, results, login, forms, sitemap; Storybook, Figma, TYPO3),
4 (load order, documented failure, uploads from file references), 5, 6 (own
icons for every element and record type), 7 (caching documented, slider focus,
docs.typo3.org manual). Nothing open.

Overview of every issue and how it is handled: Storybook › Core theme issues
(`docs/core-theme-issues.json`).

Sources: feedback from the core team (2026-09-30) and every Forge issue about
Camino: the 33 issues of the category "Themes" and the full-text matches for
"camino" and "theme_camino" (checked 2026-10-05). Each point names its issue.

## Already covered

| Camino issue                                                                                                                                                                                               | Kumano Kodo                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Menu not keyboard accessible ([#108669](https://forge.typo3.org/issues/108669))                                                                                                                            | Disclosure buttons with `aria-expanded`, Escape closes (`src/scripts/nav-flyout.ts`) |
| Dark mode toggle wanted ([#109379](https://forge.typo3.org/issues/109379))                                                                                                                                 | Site setting and toggle in the header                                                |
| Theme active although another distribution was chosen ([#109562](https://forge.typo3.org/issues/109562))                                                                                                   | Theme and demo are two packages; the theme ships no content                          |
| `impexp` missing as a dependency ([#110388](https://forge.typo3.org/issues/110388))                                                                                                                        | The demo package requires it                                                         |
| Not installed in DDEV ([#108971](https://forge.typo3.org/issues/108971))                                                                                                                                   | DDEV hook sets up theme and demo on first start                                      |
| Language menu ([#108786](https://forge.typo3.org/issues/108786)), `f:render.contentArea` ([#108847](https://forge.typo3.org/issues/108847)), record API ([#108736](https://forge.typo3.org/issues/108736)) | In place                                                                             |
| Site settings as custom properties ([#106882](https://forge.typo3.org/issues/106882), rejected for the core)                                                                                               | `kumano-theme` data processor                                                        |

## Proposed changes

### 1. Say what the package is for (feedback: "starting point or demo?")

- Keep the split: `kumano-kodo/sitepackage` is the theme and installs empty;
  `kumano-kodo/demo` is the showcase.
- Add a **starter** content set of five pages (home, about, contact, imprint,
  privacy) next to the full demo, so a new site starts from something it can
  keep instead of wiping 23 pages.
- State both in the README and the setup choice. _Effort: M._

### 2. Decide what can be customised (feedback)

Today: colours, typefaces, spacing, radii and logo per site. Missing:

- **Own CSS and JS** per site: two settings holding a file path each, loaded
  after the theme. _S._
- **Template overrides** per site: a setting that adds a template root path
  ahead of the theme's (page, partials, content). Today only `EXT:kumano_kodo`
  is on the path. _S._
- **Own content elements**: a documented recipe (own set, own CType, the shared
  partials) rather than a feature. _S._

### 3. Support the core extensions (feedback; [#108673](https://forge.typo3.org/issues/108673), [#108674](https://forge.typo3.org/issues/108674), [#108675](https://forge.typo3.org/issues/108675))

Templates and styles for `felogin`, `indexed_search` and `form`, built from the
existing form atoms (text field, select, checkbox, button), and `seo` sitemap.
Load them as optional dependencies of the site set, so a site without the
extension does not break. _L._

### 4. Stay independent of fluid_styled_content (feedback; [#109670](https://forge.typo3.org/issues/109670))

- We render without FSC, but like Camino we define `lib.contentElement`. A
  third-party set that depends on FSC replaces it and breaks every element.
  Watch #109670 for the core fix; until then add a check that fails loudly when
  the FSC set is active next to ours, and document it. _S._
- **Uploads**: the Downloads list links files by hand. Replace it by file
  references so type, size and title come from the file itself, the best
  practice that FSC's uploads element leaves behind. _M._

### 5. SEO and semantics of the demo ([#110853](https://forge.typo3.org/issues/110853), [#110854](https://forge.typo3.org/issues/110854), [#108895](https://forge.typo3.org/issues/108895))

Checked on the running demo: one H1 per page (good), but `<title>Home</title>`
without the site name, no meta description and no SEO title on any of the 23
pages, no website title in the site configuration.

- Set the website title and a page title format; fill description and SEO title
  in the demo. _S._
- Use the core's website title instead of our own `brand.name` setting, which
  holds the same thing twice. _S._
- JSON-LD for `WebSite`, `WebPage` and `BreadcrumbList` from site and page data;
  the breadcrumb processor exists. _M._

### 6. Backend ([#108671](https://forge.typo3.org/issues/108671), [#108676](https://forge.typo3.org/issues/108676), [#109599](https://forge.typo3.org/issues/109599))

- Own icons per element following the TYPO3 icon guidelines; today every element
  reuses a core icon, and Cards and their entries share `content-card`. _M._
- Preview images for the four backend layouts. _S._
- Previews print cropped text unescaped (`f:format.crop` does not escape).
  `stripTags` runs first, so no attribute survives, but the pattern is the one
  #109599 removed from Camino: escape after cropping. _S._

### 7. Smaller points

- Caching: like Camino the site sends `private, no-store`
  ([#109704](https://forge.typo3.org/issues/109704), closed as intended).
  Document `config.sendCacheHeaders` for integrators who want client caching.
  _S._
- Focus styles of the slider and its controls, checked against
  [#109507](https://forge.typo3.org/issues/109507). _S._
- Documentation in the docs.typo3.org format instead of the README alone
  ([#108672](https://forge.typo3.org/issues/108672)). _M._

## Questions

1. Starter set as a second package, or as a choice inside the demo package?
2. Which of `felogin`, `indexed_search` and `form` must work at launch?
3. Should we wait for the core fix of #109670 or ship our own guard now?
