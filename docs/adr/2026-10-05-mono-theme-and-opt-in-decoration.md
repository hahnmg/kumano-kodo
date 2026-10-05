# A fifth theme for the starter, decoration only where it is switched on

Date: 2026-10-05
Status: accepted
Extends: 2026-09-29-theme-system.md

## Context

The starter set is a place to begin, not the trail journal. It should look reduced: black on white with one signal
colour. Two elements belong to the journal rather than to the theme: the upright name beside the journal title and
the website title set large in the footer.

## Decision

- **Mono** is a fifth mode of the Figma Theme collection: white and near-black, Inter for every role at weight 600,
  radii 0, Caramel's spacing. The signal colour is orange, `#c83e00` light and `#ff7a3d` dark; the chosen `#d24100`
  missed AA on the sunk surface (4.25:1) and was darkened just enough (4.61:1). Figma accepted the fifth mode.
- The starter set uses Mono; every site can choose it.
- The upright name (setting Upright name) and the footer wordmark (setting Website title large in the footer) are
  off by default; the demo switches both on. The logo works the same way: the theme is neutral, the demo sets its
  mark.

## Consequences

- A new site shows neither element until it is switched on.
- The contrast gate checks ten theme × scheme combinations.
