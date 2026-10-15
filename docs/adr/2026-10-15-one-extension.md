# One extension; features are sets, demo and starter are created on request

Date: 2026-10-15 Status: accepted

## Context

Benjamin Kott, who is to merge Kumano Kodo into the core with Alexander, asked
for one extension whose features, the demo among them, can be switched on and
off as sets. Kumano Kodo shipped three extensions: the theme
(`kumano-kodo/sitepackage`), the demo (`kumano-kodo/demo`, with Route map and
Chapter and 35 pages imported on installation) and the starter
(`kumano-kodo/starter`, five pages imported on installation). A set only
configures a site; it cannot bring pages.

## Decision

- One extension, `kumano_kodo`, Composer package `kumano-kodo/theme`, PHP
  namespace `KumanoKodo\Theme`. Demo and starter packages are gone.
- Its sets follow TYPO3's reusable sets, a base set and feature sets:
  `kumano-kodo/theme`, `kumano-kodo/news`, `kumano-kodo/journal` (Route map and
  Chapter) and `kumano-kodo/demo` (theme, journal and news together).
- Route map and Chapter are `kk:` components; `kkd:` is gone. Their elements are
  registered always and offered to editors where the journal set is active.
- Installing the extension adds no pages. The demo and the starter are created
  as sites of their own by `kumano:demo:create` and `kumano:starter:create`, or
  from Sites › Kumano Kodo in the backend. Their pages, files and site
  configuration ship in `Resources/Private/Demo` and
  `Resources/Private/Starter`.
- impexp, news and form are suggested, not required; the commands name what is
  missing.

## Consequences

- An existing site lists `kumano-kodo/theme` instead of `kumano-kodo/site`.
- The development install creates the demo with the command on its first start.
- `npm run export:demo` and `export:starter` write into the extension.
- The journal set no longer sets `lib.contentElement.templateRootPaths.20`,
  which had replaced a site's own template path.
