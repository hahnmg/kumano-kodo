# Containers for layout, content elements per family

Date: 2026-09-30 Status: accepted Supersedes: the content part of
2026-09-30-typo3-content-and-theme-settings.md

## Context

The first model made one content element per component: 31 types, one item table
whose fields changed meaning per type, and a Section element that kept its
children as inline records invisible in the page module. Editors had to know the
component library. The proposal
`docs/proposals/2026-09-30-typo3-content-model.md` derives the model from
Storybook's layers instead.

## Decision

- Layout is two containers from `b13/container`: **Section** (one column) and
  **Columns** (the split arrangements). An element placed directly on the page
  renders as its own section; inside a container it renders bare.
- 13 content elements: core Text and Header plus Text and image, Images, Cards,
  List, Facts, Callout, Questions, Page top, Chapter, Route map, Newsletter.
  Each family has a display option instead of a type per component.
- Heading, eyebrow, background and spacing are core fields (`header`,
  `subheader`, `frame_class`, `space_before_class`), limited to the Storybook
  values.
- Items have one table per family (card, list entry, fact, question, station,
  day mark) with fields named for what they are. Every item field is always
  shown; its description names the styles that use it, because the core
  evaluates `parentRec` display conditions only in FlexForms.
- Each element has a page module preview built from backend classes only
  (badges, list group, table), showing the style, item counts, first images and
  link targets.

## Consequences

- The 31 old elements are gone without migration; the demo is rebuilt from
  `npm run export:demo`.
- Moving and nesting happen in the page module like any other content.
- Links in previews show the stored target (`t3://page?uid=…`); resolving them
  needs a frontend context the backend does not have.
