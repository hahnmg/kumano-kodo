# The theme's parts as Fluid components, the public interface for extensions

Date: 2026-10-12
Status: accepted

## Context

Georg Ringer (EXT:news) asked for parts that extension authors can use, so a news or blog list looks like the rest of
the site without front-end work of its own. fluid_styled_content is to leave the core with v15; a theme has to cover
everything the core renders. TYPO3 14.1 registers Fluid component collections by configuration (#108508).

## Decision

- Everything the theme renders is a Fluid component in `Resources/Private/Components`, namespace
  `KumanoKodo\Sitepackage\Components`, names flat (`kk:teaserCard`, not `kk:molecule.teaserCard`).
- Content parts are public; the page frame (header, footer, top bar, flyouts, logo, skip link, back to top) stays
  internal partials.
- One source: the theme's own content element templates only map record fields onto components.
- Components take finished values: `href` is a URL, `image` a file or file reference; lists are a container with one
  component per entry; text with markup goes in slots, several parts in named fragments.
- Each component loads its own stylesheet and script.
- Components are written one tag per line; `TrimComponentOutput` trims the line breaks around a component, which would
  otherwise render as spaces beside an inline one.
- The reference in the manual and in Storybook is generated from the `f:comment` and `f:argument` of each component.

## Consequences

- Names and arguments are a public interface: within a major version they only grow.
- A cross-theme contract (the same names in every theme) is a topic for the core team; these names can be a proposal.
