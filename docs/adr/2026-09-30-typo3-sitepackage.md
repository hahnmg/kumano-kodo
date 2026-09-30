# TYPO3 sitepackage and demo instance in this repository

Date: 2026-09-30
Status: accepted

## Context

The design system should run as a TYPO3 v14 site whose look is set in the backend site settings, with a demo
instance that anyone can start with DDEV. The Storybook builders are TypeScript; TYPO3 renders Fluid.

## Decision

- `typo3/` is a Composer project with two path packages: `kumano_kodo` (sitepackage, site set `kumano-kodo/site`) and
  `kumano_kodo_demo` (the trail journal as demo content). `.ddev/` at the repository root serves it; its post-start
  hook `typo3/Build/Scripts/install.sh` installs on first start and migrates on every later one.
- Site settings carry everything that is the same in every language: theme, colour mode on load, dark mode toggle,
  site name, phone and email. Texts that differ per language (top bar status, footer text, link columns, notice,
  copyright and legal links) are content elements in columns of the root page that slide down to every page, so they
  are translated like any content.
- Pages render with PAGEVIEW, content elements with their own TCA and Fluid, no fluid_styled_content. Navigation
  flyouts are page properties: type, link columns, text, overview link and a teaser.
- Fluid is a second copy of the markup. What can be generated is: `npm run build:typo3` writes the CSS, the three
  scripts, the icon, logo and small atom partials and the frontend labels from the design system. The rest is kept
  equal by a diffyard comparison of each Storybook site page with its TYPO3 page.
- Built assets are committed with the sitepackage, so the package runs without Node.
- The demo ships as `Initialisation/data.xml` plus `Initialisation/Site/`. `npm run export:demo` writes
  `typo3/Build/Demo/content.json` from the Storybook content; `ddev exec -d /var/www/html/typo3 composer demo:export`
  builds the records from it with `kumano:demo:build` and exports them.

## Consequences

- Markup changes in stories reach TYPO3 only through a new `build:typo3` run or an edit of the Fluid template; the
  diffyard comparison is what catches a template left behind.
- `data.xml` is imported once per installation. A changed demo reaches an existing instance only through
  `kumano:demo:build --replace`.
- The demo exports only files that records reference; photos not yet used by any element are not shipped.
