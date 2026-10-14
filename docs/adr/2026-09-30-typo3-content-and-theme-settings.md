# Every component as a content element, theme values as site settings

Date: 2026-09-30 Status: accepted; content elements superseded by
2026-09-30-typo3-content-model.md

## Context

After installing the sitepackage, everything in Storybook should be there: all
site pages with their content and every component as a content element. Theme
colours, typefaces and spacing should be editable in the backend, with fonts
served from the site itself. Storybook composes pages from sections that hold
one or two columns (`section()`, `split()`, `stack()` in
`stories/layout/layout.markup.ts`).

## Decision

- 31 content elements, each rendering exactly the markup of its builder in
  `stories/`. A top-level element renders as a section (background, spacing,
  anchor, accessible name, optional heading with eyebrow and aside).
- Two-column sections are the element **Section** (`kumano_section`):
  arrangement (one column or one of the split ratios), alignment, gaps, and its
  elements as inline `tt_content` children in column A and B. No container
  extension. Children keep the section's `colPos` and are filtered out of the
  page's content areas (`ResolveContentAreasEvent`) and the page module
  (`ModifyDatabaseQueryForContentEvent`).
- Repeatable parts (cards, facts, stations, questions, photos) are rows of one
  item table `tx_kumanokodo_item`, shown per element with its own fields and
  labels, as `theme_camino` does with its list items.
- Theme overrides are site settings: 18 palette colours as colour pickers, three
  typefaces, display weight, spacing unit, page margin, section spacing, content
  width and radii. A colour left at its default (the Caramel value) and an empty
  field keep the chosen theme's value. `kumano-theme` turns them into custom
  properties.
- Typefaces are Google Fonts families downloaded once to `typo3temp` and served
  from there, the approach `bootstrap_package` takes; the package itself is not
  used.
- The settings definition is generated from the Figma variables by
  `npm run build:typo3`, so each description lists the four themes' values.

## Consequences

- A Storybook change reaches TYPO3 through `build:typo3` (assets, partials,
  labels, settings) or a template edit; the diffyard comparison of all site
  pages with their TYPO3 pages shows what drifted.
- The colour pickers show the Caramel value even when another theme is chosen,
  since a colour setting needs a valid default.
- The first request after a font change downloads the font files; the DDEV
  install hook warms the default fonts.
- Backend previews of the new elements are the core default (type and heading),
  not a rendering of the content.
