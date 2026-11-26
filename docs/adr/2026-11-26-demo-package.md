# The demo is a package of its own, imported on setup

Date: 2026-11-26 Status: accepted; replaces the demo part of
`2026-10-15-one-extension.md`

## Context

For the core (epic #111554) the demo should install like Camino's: TYPO3 imports
`Initialisation/data.xml` of a package once when it is set up, and the installer
offers such a package as a distribution. In the theme package that import would
add the 38-page demo to every site that requires the theme, against the earlier
decision that installing the theme adds no pages.

## Decision

- `typo3/theme-kumano-kodo-demo` (`theme_kumano_kodo_demo`) holds the demo in
  `Initialisation/` (pages, files, site `kumano-kodo`), the set
  `typo3/theme-kumano-kodo-demo` and the demo's two forms. It requires the
  theme, impexp and form.
- After the core's import it points error pages and page settings at the
  imported pages and stores the walk form again, for the imported plugins only.
- The theme keeps the starter, created by `kumano:starter:create` or Sites ›
  Kumano Kodo; `kumano:demo:create` is gone.
- `kumano:demo:build` lives in `kumano-kodo/build`, a development-only package
  of this repository. `content.json` stays the one source.

## Consequences

- `npm run export:demo` writes into the demo package's `Initialisation/`.
- The development install gets the demo from `typo3 setup`; `KUMANO_STARTER=1`
  adds the starter on `/starter/`.
- Whether the core takes two packages is open with Benjamin Kott.
