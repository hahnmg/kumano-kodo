# One form for every content element, spacing from the design

Date: 2026-09-30 Status: accepted Builds on: 2026-09-30-typo3-content-model.md

## Context

The element forms had no fixed order, several fields meant different things per
element, and editors chose spacing in pixels. Storybook itself set the gap under
a section heading per page (40, 56 or 64). Proposal:
`docs/proposals/2026-09-30-typo3-content-form.md`.

## Decision

- Every element has the same tabs in the same order: General (display, heading,
  text, entries, links), Images, Appearance (background, space above, anchor,
  photo position, columns, alignment). The heading palette is in reading order
  (eyebrow, heading, how it is shown, text beside it) and holds only what the
  element renders.
- One entry table for cards, list entries, links and chips, fields in one order
  with one meaning each. Buttons, the link below a list and info box links are
  the element's Links.
- Spacing is a design rule with three theme variables: heading to content 56,
  elements in a section 96, elements in a column 40. Storybook's `stack` takes
  these names; the pixel fields are gone.
- Rich text with the minimal preset in every element text.
- Out of the elements: chapter numerals are counted, a hidden heading names a
  section for screen readers, the route map legend is an interface label, the
  newsletter target and the upright name are site settings, "Hero with list" is
  a Columns arrangement.

## Consequences

- Kohechi, day and route pages in Storybook moved by 16 to 56 px where the rule
  replaced a per-page gap.
- The page top keeps the core heading as a two-line field so the hero title can
  break where the design breaks it.
- The Figma page frames still use the old gaps until they are redrawn
  (`docs/figma-sync.md`).
