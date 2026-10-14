# HTML builders in Storybook, standard content elements

Date: 2026-09-29 Status: accepted

## Context

The library needs generic content elements beyond the Kumano home page.
Reference screenshots of an animal-shelter site show typical sitepackage
patterns. The target system is not fixed yet.

## Decision

- Components are plain HTML builders (`*.markup.ts`) rendered by Storybook
  `html-vite`.
- Scope adds the standard elements seen in the references (link, badge, chip,
  select, search field, avatar, icon circle, breadcrumb, teaser, person, link
  tile, CTA card, info box, fact list, notice, icon fact, sub navigation, media
  list, topbar, page header, split hero, content with sidebar) plus rich text,
  text & media, gallery, table, download list, pagination, textarea and radio.
- New elements use the existing four themes; the reference site's colours are
  not a theme.

## Consequences

- Fluid, Twig or React output is a later translation of the HTML builders.
- Figma gets one export call; Storybook is built from the exported JSON without
  further MCP calls.
