# A base theme: the trail journal's own elements live in the demo

Date: 2026-10-14 Status: accepted; packaging superseded by
2026-10-15-one-extension

## Context

Annett asked whether Kumano Kodo is a distribution for a travel journal or a
base theme to build on. The theme package held two elements only a travel
journal needs: Route map (with its stations and day marks) and Chapter (with its
numbering and photo spans).

## Decision

- Kumano Kodo is a base theme.
- Route map and Chapter, their records, fields, components, templates, previews,
  styles, icons and labels move into the demo package `kumano-kodo/demo`.
- The demo brings them with the site set `kumano-kodo/demo` and the component
  namespace `KumanoKodo\Demo\Components` (`kkd:routeMap`, `kkd:chapter`).
- Table and field names keep their prefix `tx_kumanokodo_`; Kumano Kodo is not
  released, so nothing is migrated.
- Storybook and Figma keep both parts where they are; their pages name the demo
  package.
- Page Intro with its upright name, the layout Journal and the page top Journal
  opener stay in the theme: they describe a form, not travel content.

## Consequences

- The theme offers 12 content elements; the demo adds 2.
- Templates using `kk:routeMap` or `kk:chapter` change to `kkd:`.
- `scripts/build-typo3.mjs` writes the two stylesheets and the route map's
  legend labels into the demo package.
